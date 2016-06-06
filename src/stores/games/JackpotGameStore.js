import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';

import {GameStore} from './GameStore';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class JackpotGameStore extends GameStore {

    getJackpotData() {
        return this.game;
    }

    getDailyStatus() {
        return {
            lastWinner: this.lastWinner,
            todaysLucker: this.todaysLucker
        }
    }

    getHistory() {
        return this.historyGames;
    }

    getPercentGunIcon(betAmount) {
        let percent;
        if (betAmount && betAmount.amount) {
            percent = betAmount.amount / betAmount.jackpot;
        }
        if (betAmount && betAmount.percent) {
            percent = betAmount.percent;
        }

        let iconUrl = 'jackpotGuns/';
        if (percent > 0.5) {
            return iconUrl + 'awp';
        }
        if (percent > 0.4) {
            return iconUrl + 'AK-47';
        }
        if (percent > 0.25) {
            return iconUrl + 'p90';
        }
        if (percent > 0.15) {
            return iconUrl + 'sawed-off';
        }
        if (percent > 0.05) {
            return iconUrl + 'glock';
        }

        return iconUrl + 'm9bayonet';
    }

    constructor(props) {
        super(props);

        this.game = {
            roundHash: "*************",
            profileBetAmount: 0,
            startTime: 30,
            timerStarted: false,
            jackpot: 0,
            players: []
        };

        this.historyGames = [];
        this.lastWinner = {};
        this.todaysLucker = {};
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    emitTimerChange() {
        this.emit('timerChange');
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    addTimerListener(callback) {
        this.on('timerChange', callback);
    }

    removeTimerListener(callback) {
        this.removeListener('timerChange', callback);
    }
}

let jackpotGameStoreInstance = new JackpotGameStore();

jackpotGameStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.JACKPOT_PLACE_BET:
            var jackpot = 0;
            if (action.bets.players.length > 1) {
                jackpot = action.bets.players.reduce((previousValue, currentValue)=> previousValue + currentValue.betAmount, 0);
            }
            else if (action.bets.players.length == 1) {
                jackpot = action.bets.players[0].betAmount;
            }

            jackpotGameStoreInstance.game = {
                roundHash: jackpotGameStoreInstance.game.roundHash,
                jackpot: jackpot,
                profileBetAmount: action.bets.yourBet.betAmount,
                players: action.bets.players
            };

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_START_TIMER:
            jackpotGameStoreInstance.game.startTime = action.timer.timer;
            jackpotGameStoreInstance.game.timerStarted = true;
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_TIMER_ENDED:
            jackpotGameStoreInstance.game.startTime = action.timer;
            jackpotGameStoreInstance.game.timerStarted = false;
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_START_GAME:
            jackpotGameStoreInstance.game.startTime = action.timer;
            jackpotGameStoreInstance.game.timerStarted = false;
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_KILL_PLAYER:
            for (let i = 0; i < jackpotGameStoreInstance.game.players.length; i++) {
                if (jackpotGameStoreInstance.game.players[i].id == action.killed.id) {
                    jackpotGameStoreInstance.game.players[i].isKilled = true;
                    jackpotGameStoreInstance.game.players.unshift(...jackpotGameStoreInstance.game.players.splice(i, 1));
                    break;
                }
            }
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_ROUND_WINNER:
            for (let i = 0; i < jackpotGameStoreInstance.game.players.length; i++) {
                if (jackpotGameStoreInstance.game.players[i].id == action.winner.id) {
                    jackpotGameStoreInstance.game.players[i].isWinner = true;
                    jackpotGameStoreInstance.game.players.unshift(...jackpotGameStoreInstance.game.players.splice(i, 1));
                    break;
                }
            }

            jackpotGameStoreInstance.game.timerStarted = false;
            jackpotGameStoreInstance.historyGames.push(Object.assign({}, jackpotGameStoreInstance.game));

            if (jackpotGameStoreInstance.historyGames.length > 2) {
                jackpotGameStoreInstance.historyGames.shift(1);
            }

            jackpotGameStoreInstance.lastWinner = Object.assign({}, action.winner);
            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_NEW_ROUND:
            jackpotGameStoreInstance.game = {
                roundHash: action.roundHash.gameHash,
                profileBetAmount: 0,
                startTime: 30,
                timerStarted: false,
                jackpot: 0,
                players: []
            };

            jackpotGameStoreInstance.emitChange();
            break;

        case ActionTypes.JACKPOT_GAME_STATUS:
            jackpotGameStoreInstance.game = {
                roundHash: action.gameStatus.gameHash,
                profileBetAmount: action.gameStatus.yourBet,
                startTime: action.gameStatus.timer,
                timerStarted: action.gameStatus.startTimer,
                jackpot: action.gameStatus.jackpot,
                players: action.gameStatus.players
            };

            jackpotGameStoreInstance.emitChange();
            break;

        case ActionTypes.JACKPOT_UPDATE_TIMER:

            jackpotGameStoreInstance.game.startTime = action.newTime;
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitTimerChange();
            // jackpotGameStoreInstance.emitChange();
            break;

        case ActionTypes.JACKPOT_UPDATE_DAILY_STATUS:
            jackpotGameStoreInstance.lastWinner = Object.assign({}, action.status.lastRound);
            jackpotGameStoreInstance.todaysLucker = Object.assign({}, action.status.lucker);

            jackpotGameStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }


});


export default jackpotGameStoreInstance;
