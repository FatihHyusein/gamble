import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

export
class GameStore extends EventEmitter {
    getGameHistory() {
        return this.gamesHistory;
    }

    constructor(props) {
        super(props);
        this.gamesHistory = [];
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

let gs = new GameStore();
gs.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.GET_WINNER:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);
            GameStore.emitChange();
            break;


        case ActionTypes.JACKPOT_ROUND_WINNER:
            gs.gamesHistory.push(action.winner);

            gs.emitChange();
            break;

        default:
        // do nothing
    }
});

export default gs;
