var Modal = require('react-modal');

class MarketItemPopup extends Component {
    constructor() {
        super();

        this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
    }

    handleModalCloseRequest() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        
        this.props.closeModal();
    }

    handleSaveClicked(e) {
        alert('Save button was clicked');
    }


    render() {
        const item = this.props.item;


        return (
            <Modal
                className="modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">Modal title</h4>
                    </div>
                    <div className="modal-body">
                        <div className="market-item">
                            <img src={item.image}/>
                            <div>{item.description}</div>
                            <div>
                                <div><CommonComponents.SvgIcon iconName="fb"/>{item.price}</div>
                                <CommonComponents.SvgIcon iconName="fb"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Save
                            changes
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

module.exports = MarketItemPopup;
