import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

module.exports = {

    changeHeader: function (header) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.CHANGE_HEADER,
            header: header
        });
    }

};
