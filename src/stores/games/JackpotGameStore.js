import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';

import GameStore from './GameStore';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class JackpotGameStore extends GameStore {

    getJackpotData() {
        return this.game;
    }

    getHistory() {
        return this.historyGames;
    }

    getPercentGunIcon(betAmount) {
        let percent;
        if (betAmount && betAmount.amount) {
            percent = betAmount.amount / this.game.jackpot;
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
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

let jackpotGameStoreInstance = new JackpotGameStore();

jackpotGameStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.JACKPOT_PLACE_BET:
            var jackpot = 0;
            if (action.bets.players.length > 1) {
                jackpot = action.bets.players.reduce((previousValue, currentValue)=> previousValue.betAmount + currentValue.betAmount);
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
            var killed = jackpotGameStoreInstance.game.players.find(p=> p.id == action.killed.id);
            killed.isKilled = true;
            jackpotGameStoreInstance.game = Object.assign({}, jackpotGameStoreInstance.game);

            jackpotGameStoreInstance.emitChange();
            break;
        case ActionTypes.JACKPOT_ROUND_WINNER:
            let winnerPlayer = jackpotGameStoreInstance.game.players.find(p=> p.id == action.winner.id);
            winnerPlayer.isWinner = true;

            jackpotGameStoreInstance.game.timerStarted = false;
            jackpotGameStoreInstance.historyGames.push(Object.assign({}, jackpotGameStoreInstance.game));

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

        default:
        // do nothing
    }


});


export default jackpotGameStoreInstance;
