import BaseComponent from '../../../../../base/BaseComponent';
import UserDataActionsCreators from '../../../../../actions/UserDataActionsCreators';
import UserDataStore from '../../../../../stores/UserDataStore';
import MuffinCheffLvl from './MuffinCheffLvl';
import Paging from '../../../../../common/components/Paging';

function getStateFromStores() {
    return {
        profile: UserDataStore.getUserData(),
        referrals: UserDataStore.getReferralsArray()
    };
}

class Referrals extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();
        this.state.currentPage = 1;
        this.state.totalItems = 0;

        this._onChange = this._onChange.bind(this);
        this.upgradeCheffLvl = this.upgradeCheffLvl.bind(this);
        this.retrieveReferrals = this.retrieveReferrals.bind(this);
    }

    upgradeCheffLvl() {
        BaseComponent.postAjax({
            url: "user/buyMuffinChef",
            auth: true,
            params: {},
            successFunction: (data)=> {
                UserDataActionsCreators.updateProfile(
                    Object.assign({token: UserDataStore.getToken()}, data)
                );
            }
        });
    }

    retrieveReferrals(page) {
        var sendParam = {};
        if (page) {
            sendParam.page = page;
        }

        BaseComponent.getAjax({
            url: "user/referrals",
            auth: true,
            params: sendParam,
            successFunction: (data)=> {
                UserDataActionsCreators.updateRefferalsArray(
                    data.referrals
                );
                this.setState({
                    currentPage: page,
                    totalItems: parseInt(data.totalReferrals) || data.referrals.length
                })
            }
        });
    }

    render() {
        var referralRows;
        if (this.state.referrals.length > 0) {
            referralRows = this.state.referrals.map((row, idx)=> {
                return (
                    <tr key={idx}>
                        <td className="name-col">
                            {row.name}
                        </td>
                        <td className="date-col">
                            {row.date_joined}
                        </td>

                        <td className="today-col">
                            {parseInt(row.wonToday)}
                        </td>
                        <td className="overall-col">
                            {parseInt(row.overAll)}
                        </td>
                    </tr>
                )
            });
        }
        else {
            referralRows = (
                <tr>
                    <td colSpan="4">
                        You still don't have referrals.
                    </td>
                </tr>
            );
        }

        var calc;
        if (this.props.levels[+this.state.profile.nextMuffinChefLevelLevel] && this.props.levels[+this.state.profile.nextMuffinChefLevelLevel].calc) {
            calc = (
                <div className="calculation tcenter">
                    <h3>Why to upgrade?</h3>
                    <p>{this.props.levels[+this.state.profile.nextMuffinChefLevelLevel].calc}</p>
                </div>
            );
        }

        return (
            <div className="referrals-page">
                {calc}
                <div className="muffin-levels-container">
                    <MuffinCheffLvl
                        isMyLvl={true}
                        lvl={this.state.profile.cheffBadge}
                        info={this.props.currentLevel}
                        profileIcon={this.state.profile.profileIcon}
                        onUpgrade={this.upgradeCheffLvl}
                    />

                    <MuffinCheffLvl
                        isMyLvl={false}
                        lvl={this.state.profile.nextMuffinChefLevelLevel}
                        price={this.state.profile.nextMuffinChefLevelCost}
                        info={this.props.levels[+this.state.profile.nextMuffinChefLevelLevel]}
                        profileIcon={this.state.profile.profileIcon}

                        onUpgrade={this.upgradeCheffLvl}
                    />
                </div>

                <div className="referrals-container">
                    <table className="muffin-table">
                        <thead>
                        <tr>
                            <th rowSpan="2">
                                REFERRAL
                            </th>
                            <th rowSpan="2">JOINED</th>
                            <th colSpan="2">MONEY EARNED</th>
                        </tr>
                        <tr>
                            <th>
                                TODAY
                            </th>
                            <th>
                                OVERALL
                            </th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <td>

                            </td>
                        </tr>
                        </tfoot>
                        <tbody>
                        {referralRows}
                        </tbody>
                    </table>

                    <Paging totalItems={this.state.totalItems}
                            currentPage={this.state.currentPage}
                            getItems={this.retrieveReferrals}
                            itemsPerPage={this.props.itemsPerPage}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        UserDataStore.addChangeListener(this._onChange);
        UserDataStore.addReferalsArrayChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserDataStore.removeChangeListener(this._onChange);
        UserDataStore.removeReferalsArrayChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

Referrals.defaultProps = {
    currentLevel: {
        description: "Check out the next level next to you!"
    },
    levels: [
        {description: "You have reached the max level for now"},
        {
            description: "You earn 2% of your referral's win and once 10M for every referral entered your code!",
            calc: 'With 100 referrals playing daily and winning average 1000M: 10*100 = 1000M Once and 100*1000*30*0.02 = 60000M average monthly'
        },
        {
            description: "You earn once 10M for every referral entered your code!, 2% of your referral's win and 1% of your referral's referral win!",
            calc: 'You have for example 100 referrals, with their referrals count average 100: You earn once 100*10 = 1000M If they play daily and win average 1000M you can earn ' +
            'average (100*1000*30*0.02) + (100*100*1000*30*0.01) = 60 000M + 3 000 000M = 3 060 000M  average monthly!!!'
        },
        {
            description: "You earn once 10M for every referral, 2% of your referral's win, 1% of your referral's referral win and 0.5% of his referral's win!",
            calc: 'You have for example 100 referrals, with their referrals count average 100 and their average referrals count 100: You earn once 100*10 = 1000M. ' +
            ' If they play daily and win average 1000M you can earn ' +
            'average (100*1000*30*0.02) + (100*100*1000*30*0.01) + (100*100*100*1000*30*0.005) = 60 000M + 3 000 000M + 150 000 000M = 153 060 000M  average monthly!!!'
        },
        {
            description: "New Deals coming soon!!!",
            calc: "SOON!"
        },

        {
            description: "New Deals coming soon!!!",
            calc: "SOON!"
        },
        {
            description: "New Deals coming soon!!!",
            calc: "SOON!"
        },
    ],
    itemsPerPage: 50
};

module.exports = Referrals;
