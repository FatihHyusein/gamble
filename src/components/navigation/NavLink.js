import React, { Component } from 'react'
import { Link } from 'react-router'

class NavLink extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Link {...this.props} activeClassName="active"/>
        );
    }
}

export default NavLink
