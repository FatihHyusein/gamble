import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import $ from 'jquery';
import SendViaSocket from '../actions/SocketActionCreators';
import UserDataStore from '../stores/UserDataStore';
import d3 from 'd3';

import ToastMessagesActionCreators from '../actions/ToastMessagesActionCreators';
import PopupMessagesActionCreators from '../actions/PopupMessagesActionCreators';


class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    static sendViaSocket(data) {
        return SendViaSocket(data);
    }

    static checkAuth(data) {
        if (!data.params) {
            data.params = {};
        }

        if (data.auth) {
            data.params.token = UserDataStore.getToken();
        }

        return data;
    }

    static checkForPopupMessage(error, json, data) {
        if (json.message) {
            PopupMessagesActionCreators.setNewPopupMessage({
                popupMessage: json.message
            })
        }
    }

    static checkIfFail(error, json, data) {
        if (error) {
            ToastMessagesActionCreators.setNewToasts([
                {
                    type: "error",
                    text: "Something went wrong"
                }
            ]);

            if (data.failFunction) {
                data.failFunction(json.data);
            }

            return true;
        }
        return false;
    }

    static createToasts(error, json, data) {
        if (json) {
            if (json.toasts.length > 0) {
                ToastMessagesActionCreators.setNewToasts(json.toasts);
            }
        }
        else {
            ToastMessagesActionCreators.setNewToasts([{
                type: "error",
                text: "Something went wrong"
            }]);
            if (data.failFunction) {
                data.failFunction(json.data);
            }
            return true;
        }
        return false;
    }

    static invokeCallback(error, json, data) {
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
    }

    static postAjax(data) {
        ToastMessagesActionCreators.updateLoader(true);
        data = this.checkAuth(data);

        return d3.xhr(`http://87.120.75.34/api/${data.url}`)
            .header("Content-Type", "application/json")
            .post(JSON.stringify(data.params), (error, xhr)=> {
                ToastMessagesActionCreators.updateLoader(false);
                
                var json;
                try {
                    json = JSON.parse(xhr.response);
                }
                catch (e) {
                    ToastMessagesActionCreators.setNewToasts([{
                        type: "error",
                        text: "Something went wrong"
                    }]);
                }

                this.checkForPopupMessage(error, json, data);

                if (this.checkIfFail(error, json, data)) {
                    return;
                }

                if (this.createToasts(error, json, data)) {
                    return;
                }

                this.invokeCallback(error, json, data);
            });
    }

    static getAjax(data) {
        data = this.checkAuth(data);
        ToastMessagesActionCreators.updateLoader(true);

        return d3.json(`http://87.120.75.34/api/${data.url}?${param(data.params)}`, (error, json)=> {
            ToastMessagesActionCreators.updateLoader(false);

            this.checkForPopupMessage(error, json, data);

            if (this.checkIfFail(error, json, data)) {
                return;
            }

            if (this.createToasts(error, json, data)) {
                return;
            }

            this.invokeCallback(error, json, data);
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

    _onChange() {
        this.setState(getStateFromStores());
    }
}

export default BaseComponent;
