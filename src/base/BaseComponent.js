import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import $ from 'jquery';
import SendViaSocket from '../actions/SocketActionCreators';
import UserDataStore from '../stores/UserDataStore';
import d3 from 'd3';

import ToastMessagesActionCreators from '../actions/ToastMessagesActionCreators';


class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    static sendViaSocket(data) {
        return SendViaSocket(data);
    }

    static getAjax(data) {
        if (!data.getParams) {
            data.getParams = {};
        }

        if (data.auth) {
            data.getParams.token = UserDataStore.getToken();
        }

        return d3.json(`http://87.120.75.34/api/${data.url}?${param(data.getParams)}`, (error, json)=> {
            if (error) {
                ToastMessagesActionCreators.setNewToasts([
                    {
                        type: "error",
                        message: "Something went wrong"
                    }
                ]);

                if (data.failFunction) {
                    data.failFunction(json.data);
                }

                return console.warn(error);
            }

            if (json) {
                ToastMessagesActionCreators.setNewToasts(json.toast);
            }
            else {
                ToastMessagesActionCreators.setNewToasts([{
                    type: "error",
                    message: "Something went wrong"
                }]);
            }

            if (json && json.status) {
                if (data.successFunction) {
                    data.successFunction(json.data);
                }
            }
            else {
                if (data.failFunction) {
                    data.failFunction(json.data);
                }
            }
        });

        function param(object) {
            return Object.keys(object).map((k) => {
                let formatedObject;
                if (typeof object[k] === "string") {
                    formatedObject = object[k];
                }
                else {
                    formatedObject = JSON.stringify(object[k]);
                }

                return encodeURIComponent(k) + '=' + encodeURIComponent(formatedObject)
            }).join('&');
        }
    }

    static postAjax(data) {
        return SendViaSocket(data);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

export default BaseComponent;
