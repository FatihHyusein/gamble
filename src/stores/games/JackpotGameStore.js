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

    getPercentGunIcon(betAmount) {
        let percent;
        if (betAmount && betAmount.amount) {
            percent = betAmount.amount / this.game.jackpot;
        }
        if (betAmount && betAmount.percent) {
            percent = betAmount.percent;
        }

        let iconUrl = 'jackpotGuns/';
        if (percent > 0.5) {
            return iconUrl + 'awp';
        }
        if (percent > 0.4) {
            return iconUrl + 'AK-47';
        }
        if (percent > 0.25) {
            return iconUrl + 'glock';
        }
        if (percent > 0.15) {
            return iconUrl + 'karambit';
        }
        if (percent > 0.05) {
            return iconUrl + 'm9bayonet';
        }

        return iconUrl + 'nova';
    }

    constructor(props) {
        super(props);

        this.game = {
            roundHash: '65scxz123',
            startTime: 8,
            jackpot: 555,
            players: [
                {
                    profileIcon: 'fb',
                    name: 'Kircho',
                    betAmount: 15
                },
                {
                    profileIcon: 'fb',
                    name: 'VUYCHO',
                    betAmount: 155
                },
                {
                    profileIcon: 'yt',
                    name: 'DIMCHO',
                    betAmount: 1,
                    isKilled: true
                }
            ],
            profileBetAmount: 250,
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
