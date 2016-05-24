import React, {Component} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
const SvgIcon = CommonComponents.SvgIcon;
import BaseComponent from '../../base/BaseComponent';

class Nav extends BaseComponent {

    constructor(props, context) {
        super(props, context);

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

    render() {
        var linkEls = this.props.link.map(
            (currentLink)=>
                <li key={currentLink.url}><NavLink to={currentLink.url}>{currentLink.name}</NavLink></li>
        );

        var profileLink = <li><NavLink to="/profile">
            Profile
        </NavLink></li>;

        var steamLoginLink = <img src="staticFiles/icons/signinwithsteam.png" className='login-link'
                                  onClick={this.openSteam}/>;

        var userLink = token ? profileLink : steamLoginLink;

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
