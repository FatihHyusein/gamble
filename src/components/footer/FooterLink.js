import React, {Component} from 'react'
import {Link} from 'react-router'

class FooterLink extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.icon) {
            return (

                <Link {...this.props} className="footer-link"><CommonComponents.SvgIcon iconName={this.props.icon}/></Link>
            );
        }

        return (
            <Link {...this.props} className="footer-link"/>
        );
    }
}

export default FooterLink
