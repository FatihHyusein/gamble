import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {
    updateToken: function (newToken) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_UPDATE_TOKEN,
            token: newToken
        });
    },
    updateProfile: function (profileData) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_UPDATE_PROFILE,
            profile: profileData
        });
    }

};
