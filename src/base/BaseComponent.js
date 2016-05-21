import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import $ from 'jquery';
import SendViaSocket from '../actions/SocketActionCreators';


class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    static sendViaSocket(data) {
        return SendViaSocket(data);
    }
}

export default BaseComponent;
