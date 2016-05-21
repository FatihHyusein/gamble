import JackpotGame from './JackpotGame';
import GameActionCreator from '../../../actions/games/GameActionCreators';
import JackpotStore from '../../../stores/games/JackpotGameStore';

class Jackpot extends Component {
    constructor() {
        super();

        this.state = {gameData: JackpotStore.getJackpotData()};
    }

    render() {
        return (
            <div>
                <div className="top-container">
                    <h1>JACKPOT</h1>
                </div>

                <JackpotGame game={this.state.gameData}/>
            </div>
        )
    }
}

Jackpot.defaultProps = {};


module.exports = Jackpot;
