import React, { Component } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

class Nav extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        var linkEls = this.props.link.map(
            (currentLink)=>
                <li key={currentLink.url}><NavLink to={currentLink.url}>{currentLink.name}</NavLink></li>
        );

        var profileLink = <li><NavLink to="/profile">
            Profile
        </NavLink></li>;

        var steamLoginLink = <img className='login-link' src='staticFiles/icons/steamLoginIcon.png'/>;

        var userLink = token ? profileLink : steamLoginLink;

        return (
            <nav>
                <NavLink to="/" onlyActiveOnIndex={true} className='index-link'><img src='staticFiles/icons/33772.svg'/></NavLink>
                <ul>
                    {linkEls}
                </ul>
                {userLink}
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
        }
    ]
};

export default Nav
