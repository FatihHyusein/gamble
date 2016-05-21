import BaseComponent from '../../../base/BaseComponent';


import HeaderActionCreators from '../../../actions/HeaderActionCreators';


export default
class JackpotGame extends BaseComponent {

    constructor() {
        super();
        // this.state = getStateFromStores();
        this.bet = this.bet.bind(this);
    }

    bet() {
        BaseComponent.sendViaSocket({
            type: 'TEST123',
            data: {
                cs:'go'
            }
        });

        HeaderActionCreators.testToast();
    }

    render() {
        return (
            <div>
                <h1>1112221</h1>
                <button onClick={this.bet}>BET</button>
            </div>
        )
    }

    componentDidMount() {
    }
}

JackpotGame.defaultProps = {};
