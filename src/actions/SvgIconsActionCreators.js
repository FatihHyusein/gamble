import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    setNewIcon: function (newIconName, newIcon) {
        setTimeout(()=> {
            MuffinDispatcher.dispatch({
                type: ActionTypes.SVG_ADD_ICON,
                newIconName: newIconName,
                newIcon: newIcon
            });
        }, 1);
    },
    setIconNameForCache: function (newIconName) {
        setTimeout(()=> {
            MuffinDispatcher.dispatch({
                type: ActionTypes.SVG_ADD_ICON_NAME_FOR_CACHE,
                newIconName: newIconName
            });
        }, 1);
    },
    removeIconNameFromCache: function (newIconName, iconName) {
        setTimeout(()=> {
            MuffinDispatcher.dispatch({
                type: ActionTypes.SVG_REMOVE_NAME_FROM_CACHE,
                notFoundIconName: iconName
            });
        }, 1);
    }
};
