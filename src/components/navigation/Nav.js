import React, {Component} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
const SvgIcon = CommonComponents.SvgIcon;
import BaseComponent from '../../base/BaseComponent';
import UserDataStore from '../../stores/UserDataStore';

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

        this.openSteam = this.openSteam.bind(this);
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
        var linkEls = this.props.link.map(
            (currentLink)=>
                <li key={currentLink.url}><NavLink to={currentLink.url}>{currentLink.name}</NavLink></li>
        );

        var profileLink = <NavLink to="/profile">
            <div className="logged-profile-nav-btn">
                <div>
                    <img src={this.state.profile.profileIcon}/>
                </div>
                <div className="user-data-container">
                    <div>
                        {this.state.profile.name}
                    </div>
                    <div>
                        <CommonComponents.SvgIcon iconName="muffin-currency"/> {this.state.profile.muffins}
                    </div>
                </div>
            </div>
        </NavLink>;

        var steamLoginLink = <img src="staticFiles/icons/signinwithsteam.png" className='login-link'
                                  onClick={this.openSteam}/>;

        var userLink = token ? profileLink : steamLoginLink;
        userLink = (<div>
            {profileLink}
            {steamLoginLink}
        </div>)

        return (
            <nav>
                <NavLink to="/" onlyActiveOnIndex={true} className='index-link'>
                    <span>CSG</span><img src="staticFiles/icons/muffin.png"/><span>MUFFIN</span>
                </NavLink>
                <div className="router-link-container">
                    <ul>
                        {linkEls}
                    </ul>
                    {userLink}
                </div>
            </nav>
        )
    }
}

Nav.defaultProps = {
    link: [
        {
            url: '/freeMuffins',
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
            url: '/support',
            name: 'Support'
        }
    ]
};

export default Nav
