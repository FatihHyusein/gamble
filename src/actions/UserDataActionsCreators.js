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
    },
    updateMuffins: function (muffins) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_UPDATE_MUFFINS,
            muffins: muffins
        });
    },

    updateRefferalsArray: function (referrals) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_UPDATE_REFERRALS,
            referrals: referrals
        });
    },

    updateHistoryArray: function (historyItems) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_UPDATE_HISTORY,
            historyItems: historyItems
        });
    },

    logout: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.USER_DATA_LOGOUT
        });
    }
};
