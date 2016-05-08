import React, { Component } from 'react';
import Home from './home/Home';
import Nav from './navigation/Nav';
import Footer from './Footer';

class MuffinApp extends Component {
    render() {
        return (
            <div>
                <Nav />

                <div>
                    {this.props.children || <Home />}
                </div>
                <Footer />
            </div>
        )
    }
}

module.exports = MuffinApp;
