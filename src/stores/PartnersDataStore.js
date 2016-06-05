import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class PartnersDataStore extends EventEmitter {
    getPartners() {
        return this.partners;
    }

    getTwitchPartners() {
        return this.twitchPartners;
    }

    constructor(props) {
        super(props);

        this.partners = [];
        this.twitchPartners = [];
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

let pds = new PartnersDataStore();

pds.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.UPDATE_PARTNERS_LIST:
            if (action.partners) {
                pds.partners = action.partners;
                pds.twitchPartners=[];
                pds.emitChange();
            }
            break;

        case ActionTypes.UPDATE_TWITCH_STREAMERS:
            if (action.twitchPartner) {
                pds.twitchPartners.push(action.twitchPartner);
                pds.emitChange();
            }
            break;

        default:
        // do nothing
    }
});


export default pds;
