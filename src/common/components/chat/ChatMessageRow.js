import BaseComponent from '../../../base/BaseComponent';

export default
class ChatMessageRow extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="chat-message-row">
                <img src={this.props.image}/>

                <div className="tleft">
                    <div>
                        {this.props.name}
                    </div>
                    <div>
                        {this.props.message}
                    </div>
                </div>
            </div>
        )
    }
}


ChatMessageRow.propTypes = {
    name: React.PropTypes.string,
    message: React.PropTypes.string,
    image: React.PropTypes.string
};

