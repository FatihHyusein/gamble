import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';
import GameStore from './GameStore';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

export default class JackpotGameStore extends GameStore {
    constructor(props) {
        super(props);
    }
}

JackpotGameStore.dispatchToken = MuffinDispatcher.register(function (action) {

    switch (action.type) {
        case ActionTypes.GET_WINNER:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);
            GameStore.emitChange();
            break;

        default:
        // do nothing
    }
});
