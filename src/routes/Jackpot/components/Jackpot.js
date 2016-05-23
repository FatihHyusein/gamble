import JackpotGame from './JackpotGame';
import GameActionCreator from '../../../actions/games/GameActionCreators';
import JackpotStore from '../../../stores/games/JackpotGameStore';
import BaseComponent from '../../../base/BaseComponent';


function getStateFromStores() {
    return {
        gameData: JackpotStore.getJackpotData()
    }
}

class Jackpot extends Component {
    constructor() {
        super();
        this.state = getStateFromStores();
        this._onChange = this._onChange.bind(this);
    }

    render() {
        return (
            <div>
                <div className="top-container">
                    <div className="header">JACKPOT</div>
                </div>

                <JackpotGame game={this.state.gameData}/>
            </div>
        )
    }

    componentDidMount() {
        JackpotStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        JackpotStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

}

module.exports = Jackpot;
