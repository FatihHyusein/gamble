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
                <FooterLink key={currentLink.url} href={currentLink.url} icon={currentLink.icon}/>
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
            url: '/',
            name: 'Home'
        },
        {
            url: '/profile',
            name: 'Get free muffins'
        },
        {
            url: '/support/contact',
            name: 'Contact Us'
        },

        {
            url: '/support/terms',
            name: 'Terms of service'
        },
        {
            url: '/support/faq',
            name: 'F.A.Q.'
        }
    ],
    socialLinks: [
        {
            url: 'https://twitter.com/csgomuffin',
            icon: 'twitter'
        },
        {
            url: 'https://www.facebook.com/csgomuffin/',
            icon: 'fb'
        },
        {
            url: 'https://www.youtube.com/channel/UCz-Y14QAnMTHickMe76N6Gw',
            icon: 'yt'
        }
    ]

};
export default Footer
