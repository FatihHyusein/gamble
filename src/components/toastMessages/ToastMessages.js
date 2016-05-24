import BaseComponent from '../../base/BaseComponent';
import ToastMessagesStore from '../../stores/ToastMessagesStore';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';
import ToastMessagesActionCreators from '../../actions/ToastMessagesActionCreators';


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
        this.clearToasts = this.clearToasts.bind(this);

        this.state = getState();
    }

    clearToasts() {
        ToastMessagesActionCreators.clearToasts();
    }

    render() {
        let toastMessages;
        if (this.state.messages && this.state.messages.length > 0) {
            toastMessages = this.state.messages.map((message, idx) =>
                <div key={idx} className={`${message.type} toast-inner-container`}>
                    <div className="text">{message.text}</div>
                </div>
            );
        }
        return <div id="toast" onClick={this.clearToasts}>
            <ReactCSSTransitionGroup transitionName="example"
                                     transitionEnterTimeout={500}
                                     transitionLeaveTimeout={300}>
                {toastMessages}
            </ReactCSSTransitionGroup>
        </div>;
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
