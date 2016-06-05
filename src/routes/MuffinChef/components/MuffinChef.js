import React, {Component} from 'react'
import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router';

function getStateFromStores() {
    return {};
}

class MuffinChef extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="muffinChef-page">
                <div className="top-container">
                    <div className="header"><h1>What is Muffin Chef</h1></div>
                </div>

                <div className="content">

                </div>
            </div>
        );
    }
}

module.exports = MuffinChef;
