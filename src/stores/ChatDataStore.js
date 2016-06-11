import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class ChatDataStore extends EventEmitter {
    getMessages() {
        return this.messages
    }

    constructor(props) {
        super(props);

        this.messages = [
            {
                name: 'dakula',
                message: 'fuck dfdasapoi fuck drackullll asd fi',
                image: 'http://www.csgomuffin.com/partners/Aitonix.png'
            },
            {
                name: 'zzdak21ula',
                message: 'fuck dfdasapoi fuck drackullll asd fi',
                image: 'http://www.csgomuffin.com/partners/Aitonix.png'
            },
            {
                name: 'dak33ula',
                message: 'fuck2 dfdasapoi fuck drackullll asd fi',
                image: 'http://www.csgomuffin.com/partners/Aitonix.png'
            },
            {
                name: 'da21kula',
                message: 'fuck dfdasapoi fuck drackullll asd fi',
                image: 'http://www.csgomuffin.com/partners/Aitonix.png'
            }
        ];
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

let cds = new ChatDataStore();

cds.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.CHAT_ADD_MESSAGES:
            var messages = action.messages;

            if (messages && messages.length > 0) {
                cds.messages = [...cds.messages, ...messages];
            }
            cds.emitChange();

            break;
        default:
        // do nothing
    }
});


export default cds;
