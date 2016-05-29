import React, {Component} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
const SvgIcon = CommonComponents.SvgIcon;
import BaseComponent from '../../base/BaseComponent';
import UserDataStore from '../../stores/UserDataStore';
import UserDataActionsCreators from '../../actions/UserDataActionsCreators';

function getStateFromStores() {
    return {
        profile: {
            profileIcon: UserDataStore.getProfileIcon(),
            name: UserDataStore.getName(),
            muffins: UserDataStore.getMuffins()
        }
    }
}

class Nav extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = getStateFromStores();

        this.state.toggledClass = 'not-toggled';

        this.openSteam = this.openSteam.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    openSteam() {
        BaseComponent.getAjax({
            url: "login/url",
            successFunction: (data)=> {
                window.location = data.url;
            }
        });
    }

    logout() {
        BaseComponent.postAjax({
            url: "user/logout",
            auth: true,
            params: {},
            successFunction: (data)=> {
                UserDataActionsCreators.logout();
            }
        });
    }

    toggleNav() {
        this.setState({
            toggledClass: (this.state.toggledClass === 'not-toggled') ? 'toggled' : 'not-toggled'
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
        var linkEls = this.props.link.map(
            (currentLink)=>
                <li key={currentLink.url}><NavLink to={currentLink.url}>{currentLink.name}</NavLink></li>
        );

        var profileLink = <NavLink to="/profile">
            <div className="logged-profile-nav-btn">
                <div>
                    <img src={this.state.profile.profileIcon}/>
                    <CommonComponents.SvgIcon onClick={this.logout}
                                              iconName="logout"/>
                </div>
                <div className="user-data-container">
                    <div>
                        {this.state.profile.name}
                    </div>
                    <div>
                        <CommonComponents.SvgIcon className="currency-icon"
                                                  iconName="muffin-currency"/> {this.state.profile.muffins}
                    </div>
                </div>
            </div>
        </NavLink>;

        var steamLoginLink = <img src="staticFiles/icons/signinwithsteam.png" className='login-link'
                                  onClick={this.openSteam}/>;

        var userLink = token ? profileLink : steamLoginLink;
        userLink = (<div className="user-btn">
            {userLink}
        </div>);

        return (
            <nav>
                <NavLink to="/" onlyActiveOnIndex={true} className='index-link'>
                    <CommonComponents.SvgIcon iconName="logo"/>
                </NavLink>
                <div className="router-link-container">
                    <ul className={this.state.toggledClass} onClick={this.toggleNav}>
                        {linkEls}
                    </ul>
                    {userLink}
                    <CommonComponents.SvgIcon className="hamburger-btn" iconName="hamburger" onClick={this.toggleNav}/>
                </div>
            </nav>
        )
    }
}

Nav.defaultProps = {
    link: [
        {
            url: '/profile',
            name: 'Free Muffins'
        },
        {
            url: '/jackpot',
            name: 'Jackpot'
        },
        {
            url: '/market',
            name: 'Market'
        },
        {
            url: '/deposit',
            name: 'Deposit'
        },
        {
            url: '/support',
            name: 'Support'
        }
    ]
};

export default Nav
