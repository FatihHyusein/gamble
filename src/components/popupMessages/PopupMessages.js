import Modal from 'react-modal';
import BaseComponent from '../../base/BaseComponent';

import PopupMessagesStore from '../../stores/PopupMessagesStore';
import PopupMessagesActionCreators from '../../actions/PopupMessagesActionCreators';

function getState() {
    return {
        message: PopupMessagesStore.getPopupMessage(),
        isModalOpened: PopupMessagesStore.getIsOpened()
    };
}

export default
class PopupMessages extends BaseComponent {
    constructor() {
        super();

        this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
        this.handleSaveClicked = this.handleSaveClicked.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = getState();
    }

    handleModalCloseRequest() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed

        PopupMessagesActionCreators.closePopup();
    }

    handleSaveClicked(e) {
        PopupMessagesActionCreators.closePopup();
    }


    render() {
        return (
            <Modal
                id="message-popup"
                className="modal-dialog item-modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.isModalOpened}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <div class="message">
                            {this.state.message}
                        </div>
                        <div className="action-btns-container">
                            <button className="bg-green" onClick={this.handleSaveClicked}>
                                OK
                            </button>
                            <button className="bg-red" onClick={this.handleModalCloseRequest}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    componentDidMount() {
        PopupMessagesStore.addChangeListener(this._onChange);
    }

    componentWillUnMount() {
        PopupMessagesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState());
    }
}
