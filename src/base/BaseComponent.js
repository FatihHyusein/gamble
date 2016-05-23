import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import $ from 'jquery';
import SendViaSocket from '../actions/SocketActionCreators';


class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

    }

    static sendViaSocket(data) {
        return SendViaSocket(data);
    }

    _onChange(){
        this.setState(getStateFromStores());
    }
}

export default BaseComponent;
