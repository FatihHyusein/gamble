import React, { Component } from 'react';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';

class MuffinApp extends Component {
    render() {
        return (
            <div>
                <Nav />

                <div>
                    {this.props.children || <Home header="dafuq"/>}
                </div>

                <Footer />
            </div>
        )
    }
}

module.exports = MuffinApp;
