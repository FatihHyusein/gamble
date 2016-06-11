import BaseComponent from '../../../base/BaseComponent';
import ChatDataStore from '../../../stores/ChatDataStore';
import ChatMessageRow from './ChatMessageRow';
import ChatActionCreators from '../../../actions/ChatActionCreators';
import UserDataStore from '../../../stores/UserDataStore';


function getState() {
    return ChatDataStore.getMessages();
}

export  default
class Chat extends BaseComponent {
    constructor() {
        super();
        this.state = {
            messages: getState(),
            hiddenClass: 'toggled'
        };
        this.toggleChat = this.toggleChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.checkForSend = this.checkForSend.bind(this);
    }

    toggleChat() {
        this.setState({
            hiddenClass: (this.state.hiddenClass === '') ? 'toggled' : ""
        })
    }

    sendMessage() {
        ChatActionCreators.addChatMessages([{
            name: UserDataStore.getName(),
            message: this._chatText.value,
            image: UserDataStore.getProfileIcon()
        }]);
        this._chatText.value = '';
    }

    checkForSend(event) {
        if (event.key.toLowerCase() === 'enter') {
            this.sendMessage();
        }
    }

    render() {
        var messageRows = this.state.messages.map((m, idx)=> {
            return (
                <ChatMessageRow key={m.message + idx} name={m.name} message={m.message} image={m.image}/>
            );
        });


        return (
            <div id="chat" className={`tcenter ${this.state.hiddenClass}`}>
                <div className="toggle-header pointer" onClick={this.toggleChat}>

                </div>
                <div className="messages-container" ref={(c) => this._messagesContainer = c}>
                    {messageRows}
                </div>
                <div className="new-message-input-container">
                    <input type="text"
                           onKeyUp={this.checkForSend}
                           disabled={!UserDataStore.token}
                           ref={(c) => this._chatText = c}
                    />
                    <button className="bg-green" onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        var node = this._messagesContainer;
        node.scrollTop = node.scrollHeight;
    }

    componentDidMount() {
        ChatDataStore.addChangeListener(this._onChange);
    }

    componentWillUnMount() {
        ChatDataStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            messages: getState()
        });
    }
}

Chat.propTypes = {
    isOpen: React.PropTypes.bool
};
