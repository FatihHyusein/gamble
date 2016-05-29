import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    setNewIcon: function (newIconName, newIcon) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.SVG_ADD_ICON,
            newIconName: newIconName,
            newIcon: newIcon
        });
    }
};
