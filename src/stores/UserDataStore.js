import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';

var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var REFERRAL_ARRAY_EVENT = 'refarray';
var HISTORY_ARRAY_EVENT = 'histarray';

class UserDataStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.token = "";
        this.muffins = 0;
        this.name = "";
        this.profileIcon = "";

        this.referralCode = "";
        this.tradeUrl = "";
        this.parentRefCode = "";
        this.cheffBadge = 0;

        this.referralsArray = [];
        this.historyArray = [];
    }

    getUserProp(propName) {
        return this[propName];
    }

    getReferralCode() {
        return this.getUserProp('referralCode');
    }

    getTradeUrl() {
        return this.getUserProp('tradeUrl');
    }

    getParentRefCode() {
        return this.getUserProp('parentRefCode');
    }

    getCheffBadge() {
        return this.getUserProp('cheffBadge');
    }

    getToken() {
        return token;
    }

    getMuffins() {
        return this.getUserProp('muffins');
    }

    getName() {
        return this.getUserProp('name');
    }

    getProfileIcon() {
        return this.getUserProp('profileIcon');
    }

    getNextMuffinChefLevelCost() {
        return this.getUserProp('nextMuffinChefLevelCost');
    }

    getNextMuffinChefLevelLevel() {
        return this.getUserProp('nextMuffinChefLevelLevel');
    }

    getUserData() {
        return {
            token: this.getToken(),
            profileIcon: this.getProfileIcon(),
            muffins: this.getMuffins(),
            name: this.getName(),
            referralCode: this.getReferralCode(),
            tradeUrl: this.getTradeUrl(),
            parentRefCode: this.getParentRefCode(),
            cheffBadge: this.getCheffBadge(),
            nextMuffinChefLevelCost: this.getNextMuffinChefLevelCost(),
            nextMuffinChefLevelLevel: this.getNextMuffinChefLevelLevel()
        }
    }

    getReferralsArray() {
        return this.referralsArray;
    }

    getHistoryArray() {
        return this.historyArray;
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

    emitReferalsArrayChange() {
        this.emit(REFERRAL_ARRAY_EVENT);
    }

    addReferalsArrayChangeListener(callback) {
        this.on(REFERRAL_ARRAY_EVENT, callback);
    }

    removeReferalsArrayChangeListener(callback) {
        this.removeListener(REFERRAL_ARRAY_EVENT, callback);
    }

    emitHistoryArrayChange() {
        this.emit(HISTORY_ARRAY_EVENT);
    }

    addHistoryArrayChangeListener(callback) {
        this.on(HISTORY_ARRAY_EVENT, callback);
    }

    removeHistoryArrayChangeListener(callback) {
        this.removeListener(HISTORY_ARRAY_EVENT, callback);
    }

}

let userDataStoreInstance = new UserDataStore();

userDataStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    function setProp(propName, obj) {
        userDataStoreInstance[propName] = obj;
    }

    switch (action.type) {
        case ActionTypes.USER_DATA_UPDATE_TOKEN:
            userDataStoreInstance.token = action.token;
            userDataStoreInstance.emitChange();
            break;

        case ActionTypes.USER_DATA_UPDATE_PROFILE:
            setProp('token', action.profile.token);
            setProp('profileIcon', action.profile.icon);
            setProp('muffins', parseInt(action.profile.muffins));
            setProp('name', action.profile.name);
            setProp('referralCode', action.profile.referral_code);
            setProp('tradeUrl', action.profile.trade_url);
            setProp('parentRefCode', action.profile.parent_ref_code);
            setProp('cheffBadge', action.profile.chefBadge);
            setProp('nextMuffinChefLevelCost', parseInt(action.profile.nextMuffinChefLevel.cost));
            setProp('nextMuffinChefLevelLevel', parseInt(action.profile.nextMuffinChefLevel.level));

            userDataStoreInstance.emitChange();
            break;

        case ActionTypes.USER_DATA_UPDATE_MUFFINS:
            setProp('muffins', parseInt(action.muffins));

            userDataStoreInstance.emitChange();
            break;

        case ActionTypes.USER_DATA_UPDATE_REFERRALS:
            if (action.referrals && action.referrals.length >= 0) {
                userDataStoreInstance.referralsArray = [...action.referrals];
                userDataStoreInstance.emitReferalsArrayChange();
            }

            break;

        case ActionTypes.USER_DATA_UPDATE_HISTORY:
            if (action.historyItems && action.historyItems.length >= 0) {
                userDataStoreInstance.historyArray = [...action.historyItems];
                userDataStoreInstance.emitHistoryArrayChange();
            }

            break;

        case ActionTypes.USER_DATA_LOGOUT:
            localStorage.clear();
            token = null;
            userDataStoreInstance.token = "";
            userDataStoreInstance.muffins = 0;
            userDataStoreInstance.name = "";
            userDataStoreInstance.profileIcon = "";

            userDataStoreInstance.referralCode = "";
            userDataStoreInstance.tradeUrl = "";
            userDataStoreInstance.parentRefCode = "";
            userDataStoreInstance.cheffBadge = 0;

            userDataStoreInstance.referralsArray = [];
            userDataStoreInstance.historyArray = [];

            userDataStoreInstance.emitChange();
            userDataStoreInstance.emitHistoryArrayChange();
            userDataStoreInstance.emitReferalsArrayChange();
            break;

        default:
        // do nothing
    }
});


export default userDataStoreInstance;
