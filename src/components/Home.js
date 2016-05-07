import React, { Component } from 'react';
import { Link } from 'react-router';

import HeaderStore from '../stores/HeaderStore';
import HeaderActionCreators from '../actions/HeaderActionCreators';

function getStateFromStores() {
    return {
        innerHeader: HeaderStore.getNewHeader()
    };
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = getStateFromStores();
        this.changeInnerHeader = this.changeInnerHeader.bind(this);
        this.updateAll = this.updateAll.bind(this);
    }

    changeInnerHeader() {
        this.setState(getStateFromStores());
    }

    updateAll() {
        HeaderActionCreators.changeHeader();
        this.setState(getStateFromStores());
    }

    render() {
        return (
            <div>
                <h2>{this.state.innerHeader}***</h2>
                <button onClick={this.changeInnerHeader}>Update me</button>
                <button onClick={this.updateAll}>Update me</button>
            </div>
        )
    }
}


export default Home;
