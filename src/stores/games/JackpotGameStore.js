import MuffinDispatcher from '../../dispather/MuffinDispatcher';
import MuffinConstants from '../../constants/MuffinConstants';
import {EventEmitter} from 'events';

import GameStore from './GameStore';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class JackpotGameStore extends GameStore {

    getJackpotData() {
        return this.game;
    }

    constructor(props) {
        super(props);

        this.game = {
            roundHash: '65scxz123',
            startTime: 30,
            jackpot: 555,
            players: [
                {
                    profileIcon: 'fb',
                    name: 'Kircho',
                    betAmount: 15,
                    gunIcon: ''
                }
            ],
            dailyLucker: {
                profileIcon: 'fb',
                name: 'Kircho',
                betAmount: 15,
                gunIcon: ''
            },
            history: [
                {
                    winner: {
                        profileIcon: 'fb',
                        name: 'Kircho',
                        betAmount: 15,
                        gunIcon: ''
                    },
                    players: [
                        {
                            profileIcon: 'fb',
                            name: 'Kircho',
                            betAmount: 15,
                            gunIcon: ''
                        }
                    ]
                }
            ]

        };
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

let jackpotGameStoreInstance = new JackpotGameStore();

jackpotGameStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.PLACE_BET:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);

            jackpotGameStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default jackpotGameStoreInstance;
