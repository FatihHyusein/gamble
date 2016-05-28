import React, {Component} from 'react';
import BaseComponent from '../base/BaseComponent';
import Home from './home/Home';
import Nav from './navigation/Nav';
import Footer from './footer/Footer';
import ToastMessages from './toastMessages/ToastMessages';
import PopupMessages from './popupMessages/PopupMessages';
import ToastMessagesActionCreators from '../actions/ToastMessagesActionCreators';
import UserDataActionsCreators from '../actions/UserDataActionsCreators';
import UserDataStore from '../stores/UserDataStore';


class MuffinApp extends BaseComponent {
    render() {
        return (
            <div>
                <Nav />
                <div className="page-wrapper">
                    <ToastMessages />
                    <PopupMessages />
                    <div>
                        {this.props.children || <Home />}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    componentWillMount() {
        if (typeof token !== "undefined" && token) {
            UserDataActionsCreators.updateToken(token);
        }

        if (UserDataStore.getToken()) {

            BaseComponent.getAjax({
                url: "user/data",
                auth: true,
                successFunction: (data)=> {
                    UserDataActionsCreators.updateProfile(
                        Object.assign({token: UserDataStore.getToken()}, data)
                    )
                }
            });

        }
    }

    componentDidMount() {
        if (typeof failMessage !== "undefined" && failMessage) {
            ToastMessagesActionCreators.setNewToasts([{
                type: "error",
                text: failMessage
            }])
        }
    }
}

module.exports = MuffinApp;
