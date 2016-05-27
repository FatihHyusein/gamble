var Modal = require('react-modal');

class MarketItemPopup extends Component {
    constructor() {
        super();

        this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
        this.handleSaveClicked = this.handleSaveClicked.bind(this);
    }

    handleModalCloseRequest() {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed

        this.props.closeModal();
    }

    handleSaveClicked(e) {
        this.props.addToBasket(this.props.item);
    }


    render() {
        const item = this.props.item;

        return (
            <Modal
                className="modal-dialog item-modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="item-description">
                            <img src={item.image}/>
                            <div>{item.description}</div>
                            <div><CommonComponents.SvgIcon iconName="fb"/>{item.price}</div>
                            <button className="bg-green" onClick={this.handleModalCloseRequest}>Inspect in game</button>
                        </div>
                        <div className="item-buy-container">
                            <div class="question">Are you sure you wabt to add {item.description} to the basket?</div>
                            <div className="answer-container">
                                <button className="bg-green" onClick={this.handleSaveClicked}>
                                    Add to basket
                                </button>
                                <button className="bg-red" onClick={this.handleModalCloseRequest}>
                                    cancel
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

module.exports = MarketItemPopup;
