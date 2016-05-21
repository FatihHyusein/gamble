import BaseComponent from '../../base/BaseComponent';
import ToastMessagesStore from '../../stores/ToastMessagesStore';


function getState() {
    return {
        messages: ToastMessagesStore.getToastMessages()
    };
}

export default
class ToastMessages extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this._onChange = this._onChange.bind(this);

        this.state = getState();
    }

    render() {
        console.log(this.state);
        let toastMessages;
        if (this.state.messages && this.state.messages.length > 0) {
            toastMessages = this.state.messages.map((message, idx) =>
                <div key={idx} className={message.type}>
                    <div className="text">{message.text}</div>
                </div>
            );
        }
        return <div id="toast">{toastMessages}</div>;
    }


    componentDidMount() {
        ToastMessagesStore.addChangeListener(this._onChange);
    }

    componentWillUnMount() {
        ToastMessagesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState());
    }

}
