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
    },
    setIconNameForCache: function (newIconName, newIcon) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.SVG_ADD_ICON_NAME_FOR_CACHE,
            newIconName: newIconName
        });
    },
    removeIconNameFromCache: function (newIconName, iconName) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.SVG_REMOVE_NAME_FROM_CACHE,
            notFoundIconName: iconName
        });
    }
};
