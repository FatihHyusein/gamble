import React, { Component } from 'react'
import { Link } from 'react-router'

class Nav extends Component {

    constructor(props, context) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        alert('log out')
    }

    render() {
        const { user } = this.props;

        return (
            <div >
                <div>
                    <Link to="/">Home</Link>{' '}
                    <Link to="/freeMuffins" >Free Muffins</Link>{' '}
                    <Link to="/jackpot" >Jackpot</Link>{' '}
                    <Link to="/market" >Market</Link>{' '}
                </div>
                <div>
                    <Link  to="/profile">{user.name}</Link>
                    <button onClick={this.logOut}>log out</button>
                </div>
            </div>
        )
    }
}

Nav.defaultProps = {
    user: {
        id: 1,
        name: 'Ryan Florence'
    }
};

export default Nav
