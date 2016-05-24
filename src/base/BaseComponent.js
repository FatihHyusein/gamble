import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import $ from 'jquery';
import SendViaSocket from '../actions/SocketActionCreators';
import d3 from 'd3';


class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    static sendViaSocket(data) {
        return SendViaSocket(data);
    }

    static getAjax(data) {
        return d3.json(`http://87.120.75.34/api/${data.url}`, (error, json)=> {
            if (error) return console.warn(error);

            if (data.successFunction) {
                data.successFunction(json.data);
            }
        });
    }

    static postAjax(data) {
        return SendViaSocket(data);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

export default BaseComponent;
