import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class SvgIconsStore extends EventEmitter {
    getIcon(name) {

        return this.iconsDict[name];
    }

    constructor(props) {
        super(props);

        this.iconsDict = {};
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

let sis = new SvgIconsStore();

sis.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.SVG_ADD_ICON:
            if (action.newIcon) {
                sis.iconsDict[action.newIconName] = action.newIcon;
            }

            sis.iconsDict = Object.assign({}, sis.iconsDict);

            sis.emitChange();
            break;

        default:
        // do nothing
    }
});


export default sis;
