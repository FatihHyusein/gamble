import React, {Component} from 'react'
import {Link} from 'react-router';
import FooterLink from './FooterLink';

class Footer extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        var innerLinks = this.props.innerLinks.map(
            (currentLink, idx)=>
                <FooterLink key={currentLink.url} to={currentLink.url}>{currentLink.name}</FooterLink>
        );

        var socialLinks = this.props.socialLinks.map(
            (currentLink)=>
                <FooterLink key={currentLink.url} to={currentLink.url} icon={currentLink.icon}/>
        );

        return (
            <div id="footer">
                <div className="inner-links-container">
                    {innerLinks}
                </div>
                <div className="social-media-links">
                    {socialLinks}
                </div>
                <div className="reserved">
                    All rights reserved 2016
                </div>
            </div>
        )
    }
}

Footer.defaultProps = {
    innerLinks: [
        {
            url: '/freeMuffins',
            name: 'Home'
        },
        {
            url: '/jackpot',
            name: 'Support'
        },
        {
            url: '/market',
            name: 'Get free muffins'
        },
        {
            url: '/jackpot',
            name: 'Terms of service'
        },
        {
            url: '/market',
            name: 'F.A.Q.'
        }
    ],
    socialLinks: [
        {
            url: '/freeMuffins',
            icon: 'twitter'
        },
        {
            url: '/jackpot',
            icon: 'fb'
        },
        {
            url: '/market',
            icon: 'yt'
        }
    ]

};
export default Footer
