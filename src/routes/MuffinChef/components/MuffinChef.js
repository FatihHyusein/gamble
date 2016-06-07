import React, {Component} from 'react'
import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router';
import UserDataStore from '../../../stores/UserDataStore';
import MuffinCheffLvl from '../../../routes/Profile/routes/Referrals/component/MuffinCheffLvl';
import UserDataActionsCreators from '../../../actions/UserDataActionsCreators';

function getStateFromStores() {
    return {
        profile: UserDataStore.getUserData()
    };
}

class MuffinChef extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();

        this._onChange = this._onChange.bind(this);
        this.upgradeCheffLvl = this.upgradeCheffLvl.bind(this);
        this.openSteam = this.openSteam.bind(this);
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

    openSteam() {
        BaseComponent.getAjax({
            url: "login/url",
            successFunction: (data)=> {
                window.location = data.url;
            }
        });
    }

    componentDidMount() {
        UserDataStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserDataStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

    render() {
        let upgradeLoggedUser = (
            <div className="upgrade-container tcenter pointer action-link" onClick={this.openSteam}>
                <div>Login and join Muffin Chef or upgrade your existing level right now by clicking here!</div>
                <img src="staticFiles/icons/signinwithsteam.png"
                     className='login-link'
                />
            </div>
        );

        if (this.state.profile && this.state.profile.token) {
            upgradeLoggedUser = (
                <div className="upgrade-container tcenter">
                    <div>
                        <Link className="action-link" to="/profile/referrals">
                            Join Muffin Chef or upgrade your existing level right now by clicking here!
                        </Link>
                    </div>

                    <div className="muffin-upgrade pointer" onClick={this.upgradeCheffLvl}>
                        <MuffinCheffLvl
                            isMyLvl={false}
                            lvl={this.state.profile.nextMuffinChefLevelLevel}
                            price={this.state.profile.nextMuffinChefLevelCost}
                            info={{description:""}}

                            profileIcon={this.state.profile.profileIcon}

                            onUpgrade={function() {}}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div id="muffinChef-page">
                <div className="top-container">
                    <div className="header"><h1>Muffin Chef</h1></div>
                </div>

                <div className="content">
                    <p>
                        Join CSGOMuffin and feel one of the smoothest gameplay experiences in the CS:GO Gambling world.
                        If you are tired of not having luck at the casino, but you still want to make money out of the
                        game, Muffin Chef is the place.
                    </p>
                    <p>
                        Team up with the muffins for a possibility of a good investment. You will see combining the
                        pleasure of gaming with our website will lead you to stable income. One time a muffin chef,
                        always a muffin chef. This is the only place where you can help the fellow CS:GO get amazing
                        skins, while earning good amounts of money for yourself. Even if you are playing the game for
                        just a few weeks or months, you already have a few friends that are ready to try their luck at
                        CSGOMuffin.
                    </p>
                    <p>
                        After becoming a Muffin Chef you can get the possibility to create a multilevel network of
                        bettors, which will serve you well – 24/7, 365 days in the year. Once you get enough referrals
                        under yourself, just sit and relax. They will invite others, which will invite more people. All
                        these people can be under you and earn you muffins.
                    </p>
                    <p>
                        Let’s make one simple calculation! You refer 10 of your friend to our website. If the average
                        daily earning of a referral are 500 muffins, you will get 10*500*30*0.02 = 3000 muffins which is
                        the equivalent of 30 bucks. That is only your first level of referrals. If you upgrade your
                        Muffin Chef level, you can earn from their referrals and the referrals of their referrals. It
                        sounds amazing? It definitely is.
                    </p>
                    <table className="muffin-table">
                        <thead>
                        <tr>
                            <th>
                                Referrals
                            </th>
                            <th>
                                Referral's daily earning (average)
                            </th>
                            <th>
                                Days
                            </th>
                            <th>
                                Earning
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>10 <CommonComponents.SvgIcon iconName="referral"/></td>
                            <td>500<CommonComponents.SvgIcon iconName="muffin-currency"/></td>
                            <td>30</td>
                            <td>3000<CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/>
                            </td>
                        </tr>
                        <tr>
                            <td>50 <CommonComponents.SvgIcon iconName="referral"/></td>
                            <td>500<CommonComponents.SvgIcon iconName="muffin-currency"/></td>
                            <td>30</td>
                            <td>15 000<CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/>
                            </td>
                        </tr>
                        <tr>
                            <td>100 <CommonComponents.SvgIcon iconName="referral"/></td>
                            <td>500<CommonComponents.SvgIcon iconName="muffin-currency"/></td>
                            <td>30</td>
                            <td>30 000<CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p>
                        If you choose not to participate in your referral program and in Muffin Chef you will miss a lot
                        of opportunities to earn amazing free skins. You will have only your luck on your side and
                        nothing assured. Wouldn’t that be unfortunate? It your choice, but choose wisely!
                    </p>
                    <p>
                        So let’s sum it up! If you want to earn great skins, if you want to make good investments, if
                        you want to help your friends earn, while you keep getting muffins for yourself, Muffin Chef is
                        for you. Noting can limit your earnings. If you are eager to succeed, you will! Here are a few
                        tips which will help you get more referrals:
                    </p>
                    <div>
                        <div>
                            1. Talk with all your Steam friends about our amazing website. Present them all the great
                            games
                            and possibilities.
                        </div>
                        <div>
                            2. Publish an update in Facebook and Twitter to let your friends know about CSGOMuffin.com,
                            don’t forget to paste your referral code in the post, so you can make them your referrals.
                        </div>
                        <div>
                            3. Join Facebook and Steam CS:GO groups where you can talk to a lot of like minded people.
                            Let
                            them know about our project. You will never regret this!
                        </div>
                    </div>
                    {upgradeLoggedUser}
                </div>
            </div>
        );
    }
}

module.exports = MuffinChef;
