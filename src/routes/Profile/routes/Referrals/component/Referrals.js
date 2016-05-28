import BaseComponent from '../../../../../base/BaseComponent';
import UserDataActionsCreators from '../../../../../actions/UserDataActionsCreators';
import UserDataStore from '../../../../../stores/UserDataStore';
import MuffinCheffLvl from './MuffinCheffLvl';

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
        BaseComponent.getAjax({
            url: "user/referrals",
            auth: true,
            params: {},
            successFunction: (data)=> {
                UserDataActionsCreators.updateRefferalsArray(
                    data.referrals
                );
            }
        });
    }

    componentWillMount() {
        this.retrieveReferrals();
    }

    render() {
        var referralRows = this.state.referrals.map((row, idx)=> {
            return (
                <tr key={idx}>
                    <td>
                        {row.name}
                    </td>
                    <td>
                        {row.date_joined}
                    </td>

                    <td>
                        {parseInt(row.wonToday)}
                    </td>
                    <td>
                        {parseInt(row.overall)}
                    </td>
                </tr>
            )
        });

        return (
            <div className="referrals-page">
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
                    <table>
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
        description: "Upgrade to next lvl"
    },
    levels: [
        {description: "You have reached the max level for now"},
        {description: "You earn 2% of your referral's win!"},
        {description: "SOON!!!"},
        {description: "SOON!!!"},
        {description: "SOON!!!"},
        {description: "SOON!!!"},
        {description: "SOON!!!"}
    ]
};

module.exports = Referrals;
