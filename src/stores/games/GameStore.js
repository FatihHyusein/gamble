import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

export default class GameStore extends EventEmitter {
    constructor(props) {
        super(props);
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

GameStore.dispatchToken = MuffinDispatcher.register(function (action) {

    switch (action.type) {
        case ActionTypes.GET_WINNER:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);
            GameStore.emitChange();
            break;

        default:
        // do nothing
    }
});
