import UserDataSore from '../stores/UserDataStore';
import ToastMessagesActionCreators from './ToastMessagesActionCreators';
import GameActionCreators from './games/GameActionCreators';
import UserDataActionsCreators from './UserDataActionsCreators';

class Socket {
    constructor(domain, port, secure, isDebugMode) {
        this.init(domain, port, secure, isDebugMode);
    }

    init(domain, port, secure, isDebugMode) {
        if (!this.location) {
            if (!domain) {
                domain = document.domain.toString();
            }

            var protocol = 'ws://';
            if (secure) {
                protocol = 'wss://';
            }

            this.location = protocol + domain + ':' + port + '/';
            this.initTry = 0;
        }

        this.debugMode = isDebugMode;

        this.log('Connect to: ' + this.location);
        var sock = new WebSocket(this.location);
        sock.onopen = this.onOpen.bind(this);
        sock.onmessage = this.onMessage.bind(this);
        sock.onclose = this.onClose.bind(this);

        if (!this._pending_messages) {
            this._pending_messages = [];
        }
        this.sock = sock;
        this.pingInterval = 5000;
        this.initInterval = 20000;
        this.stopPing = 0;

        if (!this.lastMessageType) {
            this.lastMessageType = {};
        }
        this.initTry++;
    }

    close() {
        try {
            this.sock.close();
        } catch (e) {
        }

        this.sock = null;
        this.opened = null;
        this.initTry = 7;
    };

    onOpen() {
        this.log('Socket Open');
        this.opened = 1;

        this.initTry = 0;

        if (this.startInitInterval) {
            clearTimeout(this.startInitInterval);
            this.startInitInterval = 0;
        }

        while (this._pending_messages.length) {
            this.send(this._pending_messages.pop());
        }

        // for (var key in  this.lastMessageType) {
        //     if (this.lastMessageType.hasOwnProperty(key)) {
        //         this.send(this.lastMessageType[key]);
        //     }
        // }

        this.pingIntervalFunction = function () {
            this.send({"ping": "pong"});
        };
        this.timerSend = setInterval(this.pingIntervalFunction.bind(this), this.pingInterval);
    };

    send(message) {

        if (!this.opened) {


            clearInterval(this.timerSend);
            if (message.ping) {
                return;
            }

            if (message.sendOnConnect) {
                this._pending_messages.push(message);
            }else{
                ToastMessagesActionCreators.setNewToasts([{
                    type: "error",
                    text: "Socket is not opened"
                }]);
            }
            return;
        }

        if (!message) {
            return;
        }

        // if (message.type) {
        //     this.lastMessageType[message.type] = message;
        // }

        var msg = {};
        var renew_ping = 0;

        if (this.stopPing && message.ping) {
            return;
        }

        if (!message.ping && this.timerSend) {
            this.log("TIMER CLEAR: " + this.timerSend);
            clearInterval(this.timerSend);
            this.timerSend = null;
            renew_ping = 1;
        }


        msg.MSG = message;
        msg.date = new Date().getTime();

        msg = {
            token: UserDataSore.getToken(),
            type: message.type,
            data: message.data
        };

        message = JSON.stringify(msg);

        if (message) {
            if (this.sock) {
                this.log('Socket send: ' + message);
                this.sock.send(message);
            } else {
                this.log('No socket to send: ' + message);
            }
        } else {
            this.log('No message to send in socket: ' + message);
        }

        if (renew_ping) {
            if (this.timerSend) {
                clearInterval(this.timerSend);
            }

            this.timerSend = setInterval(this.pingIntervalFunction.bind(this), this.pingInterval);
        }
    };

    log(data) {
        if (this.debugMode !== true) {
            return;
        }
        try {
            console.log(data);
        } catch (e) {
        }
    };

    onMessage(msg) {
        this.log('Message recieved: ' + msg.data);
        var parsedMessage = JSON.parse(msg.data);


        if (parsedMessage.toasts && parsedMessage.toasts.length > 0) {
            ToastMessagesActionCreators.setNewToasts(parsedMessage.toasts);
        }

        switch (parsedMessage.type) {
            case "onlinePlayers":
                break;
            case "playerBet":
                GameActionCreators.jackpotPlaceBet(parsedMessage.data);
                break;

            case "startTimer":
                GameActionCreators.jackpotStartTimer(parsedMessage.data);
                break;
            case "timerEnded":
                GameActionCreators.jackpotTimerEnded(parsedMessage.data);
                break;
            case "startGame":
                GameActionCreators.jackpotStartGame(parsedMessage.data);
                break;

            case "killPlayer":
                GameActionCreators.jackpotKillPlayer(parsedMessage.data);
                break;

            case "roundWinner":
                GameActionCreators.jackpotRoundWinner(parsedMessage.data);
                break;
            case "newRound":
                GameActionCreators.jackpotNewRound(parsedMessage.data);
                break;

            case "currentGameStatus":
                GameActionCreators.jackpotCurrentGameStatus(parsedMessage.data);
                break;

            case "updateProfileData":
                UserDataActionsCreators.updateMuffins(parsedMessage.data.muffins);
                break;

            default:
                break;
        }
    };

    onClose(m) {
        try {
            this.sock.close();
        } catch (e) {
        }

        this.sock = null;
        this.opened = null;

        clearInterval(this.timerSend);
        this.timerSend = null;

        if (!this.initTry || this.initTry < 6) {

            if (this.startInitInterval) {
                clearTimeout(this.startInitInterval);
                this.startInitInterval = 0;
            }

            this.retryFunction = function () {
                this.init(this.location);
            };
            this.startInitInterval = setTimeout(this.retryFunction.bind(this), this.initInterval);

            this.log('Socket Close! Reopen after ' + this.pingInterval + ' ms! Try ' + this.initTry + '!');
            ToastMessagesActionCreators.setNewToasts([{
                type: "error",
                text: "Socket Connection is closed. Please try again."
            }]);
        } else {
            this.sock = null;
            this.opened = null;
            this._pending_messages = [];
            clearInterval(this.timerSend);
            this.timerSend = null;
            this.log('Socket Close!');
        }
    };
}

export default (function () {
    var socketInstance;

    function createInstance() {
        return new Socket('87.120.75.34', 2000, false, true);
    }

    return (function () {
        if (!socketInstance) {
            socketInstance = createInstance();
        }
        return socketInstance.send.bind(socketInstance);
    })();
})();
