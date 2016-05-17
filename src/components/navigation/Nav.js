import React, {Component} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
const SvgIcon = CommonComponents.SvgIcon;

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

        var steamLoginLink = <SvgIcon iconName='fb' className='login-link'/>;

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
