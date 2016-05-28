import React, {Component} from 'react'
import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router';
import ProfileOverview from './ProfileOverview';
import UserDataStore from '../../../stores/UserDataStore';
import UserDataActionsCreators from '../../../actions/UserDataActionsCreators';


function getStateFromStores() {
    return {
        profile: UserDataStore.getUserData()
    };
}

class Profile extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();

        this._onChange = this._onChange.bind(this);
        this.addReferralCode = this.addReferralCode.bind(this);
        this.updateTradeUrl = this.updateTradeUrl.bind(this);
    }

    addReferralCode(refCode) {
        BaseComponent.postAjax({
            url: "/user/addReferralCode",
            auth: true,
            params: {
                code: refCode
            },
            successFunction: (data)=> {
                UserDataActionsCreators.updateProfile(
                    Object.assign({token: UserDataStore.getToken()}, data)
                );
            }
        });

    }

    updateTradeUrl(newTradeUrl) {
        BaseComponent.postAjax({
            url: "/user/addTradeUrl",
            auth: true,
            params: {
                tradeUrl: newTradeUrl
            },
            successFunction: (data)=> {
                UserDataActionsCreators.updateProfile(
                    Object.assign({token: UserDataStore.getToken()}, data)
                );
            }
        });
    }

    render() {
        var tabs = this.props.tabs.map((tab, idx)=> {
            return ( <Link to={`profile${tab.route}`} activeClassName="active" key={idx} onlyActiveOnIndex={true}>
                <CommonComponents.SvgIcon iconName={tab.icon}/>
                <div>
                    {tab.name}
                </div>
            </Link>);
        });

        return (
            <div id="profile-page">
                <div className="profile-nav">
                    {tabs}
                </div>
                <div className="tab-container">
                    {this.props.children ||
                    <ProfileOverview
                        profileData={this.state.profile}
                        onUpdateTradeUrl={this.updateTradeUrl}
                        onAddReferralCode={this.addReferralCode}
                    />}
                </div>
            </div>
        )
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
}

Profile.defaultProps = {
    tabs: [
        {
            name: "PROFILE OVERVIEW",
            route: '',
            icon: 'players'
        },
        {
            name: "REFERRALS",
            route: '/referrals',
            icon: 'referral'
        },
        {
            name: "HISTORY",
            route: '/history',
            icon: 'coinflip'
        }
    ]
};

module.exports = Profile;
