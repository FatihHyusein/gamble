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
            url: '/index',
            name: 'Home'
        },
        {
            url: '/support',
            name: 'Support'
        },
        {
            url: '/freeMuffins',
            name: 'Get free muffins'
        },
        {
            url: '/tofs',
            name: 'Terms of service'
        },
        {
            url: '/faq',
            name: 'F.A.Q.'
        }
    ],
    socialLinks: [
        {
            url: '/twitter',
            icon: 'twitter'
        },
        {
            url: '/fb',
            icon: 'fb'
        },
        {
            url: '/yt',
            icon: 'yt'
        }
    ]

};
export default Footer
