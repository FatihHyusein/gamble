//var ChatMessageUtils = require('../utils/ChatMessageUtils');
//var EventEmitter = require('events').EventEmitter;
//var ThreadStore = require('../stores/ThreadStore');
//var assign = require('object-assign');

import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

export default class HeaderStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.dafuq = function () {
        }
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
HeaderStore.getNewHeader = function () {
    return 'HEEE';
};

HeaderStore.dispatchToken = MuffinDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.CHANGE_HEADER:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);
            HeaderStore.emitChange();
            break;

        default:
        // do nothing
    }

});
