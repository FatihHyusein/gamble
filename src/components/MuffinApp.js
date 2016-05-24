import React, {Component} from 'react';
import Home from './home/Home';
import Nav from './navigation/Nav';
import Footer from './footer/Footer';
import ToastMessages from './toastMessages/ToastMessages';
import ToastMessagesActionCreators from '../actions/ToastMessagesActionCreators';

class MuffinApp extends Component {
    render() {
        return (
            <div>
                <ToastMessages />
                <Nav />

                <div>
                    {this.props.children || <Home />}
                </div>
                <Footer />
            </div>
        )
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
