import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {
    updatePartnersList: function (partners) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.UPDATE_PARTNERS_LIST,
            partners: partners
        });
    },
    updateTwitchStreamers: function (partner) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.UPDATE_TWITCH_STREAMERS,
            twitchPartner: partner
        });
    }
};
