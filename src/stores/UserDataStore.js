import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';

var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class UserDataStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.token = "";
        this.muffins = 50;
        this.name = "";
        this.profileIcon = "";
    }

    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }

        return this.token;
    }

    getMuffins() {
        if (!this.muffins) {
            this.muffins = localStorage.getItem('muffins');
        }

        return this.muffins;
    }

    getName() {
        if (!this.name) {
            this.name = localStorage.getItem('name');
        }

        return this.name;
    }

    getProfileIcon() {
        if (!this.profileIcon) {
            this.profileIcon = localStorage.getItem('profileIcon');
        }

        return this.profileIcon;
    }

    getUserData() {
        return {
            token: this.getToken(),
            muffins: this.getMuffins(),
            name: this.getName(),
            profileIcon: this.getProfileIcon()
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

let userDataStoreInstance = new UserDataStore();

userDataStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.USER_DATA_UPDATE_TOKEN:
            userDataStoreInstance.token = action.token;
            localStorage.setItem('token', userDataStoreInstance.token);
            userDataStoreInstance.emitChange();
            break;

        case ActionTypes.USER_DATA_UPDATE_PROFILE:

            userDataStoreInstance.token = action.profile.token;
            localStorage.setItem('token', userDataStoreInstance.token);

            userDataStoreInstance.profileIcon = action.profile.profileIcon;
            localStorage.setItem('profileIcon', userDataStoreInstance.profileIcon);

            userDataStoreInstance.name = action.profile.name;
            localStorage.setItem('name', userDataStoreInstance.name);

            userDataStoreInstance.muffins = action.profile.muffins;
            localStorage.setItem('muffins', userDataStoreInstance.muffins);

            userDataStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default userDataStoreInstance;
