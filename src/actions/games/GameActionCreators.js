import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import SendViaSocket from '../../actions/SocketActionCreators';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    jackpotPlaceBet: function (bets) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_PLACE_BET,
            bets: bets
        });
    },
    jackpotStartTimer: function (timer) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_START_TIMER,
            timer: timer
        });
    },
    jackpotTimerEnded: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_TIMER_ENDED,
            timer: 0
        });
    },
    jackpotStartGame: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_START_GAME,
            timer: 0
        });
    },

    jackpotKillPlayer: function (killed) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_KILL_PLAYER,
            killed: killed
        });
    },

    jackpotRoundWinner: function (winner) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_ROUND_WINNER,
            winner: winner
        });
    },
    jackpotNewRound: function (roundHash) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_NEW_ROUND,
            roundHash: roundHash
        });
    },
    jackpotCurrentGameStatus: function (gameStatus) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_GAME_STATUS,
            gameStatus: gameStatus
        });
    },

    updateTimer: function (time) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_UPDATE_TIMER,
            newTime: time
        });
    },

    updateDailyLucker: function (status) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.JACKPOT_UPDATE_DAILY_STATUS,
            status: status
        });
    }

    
};
