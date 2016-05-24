import BaseComponent from '../../../base/BaseComponent';
import DepositList from './DepositList';
import Timer from './Timer';
import ProfileBet from './ProfileBet';


export default
class JackpotGame extends BaseComponent {
    constructor() {
        super();

        this.timerStopped = this.timerStopped.bind(this);
        this.state = {
            gameState: 1
        }
    }

    timerStopped() {
        this.setState({gameState: 2})
    }

    render() {
        return (
            <div id="jackpot-game">
                <div>
                    <Timer time={this.props.game.startTime} onTimerStopped={this.timerStopped}/>
                    <DepositList players={this.props.game.players} gameState={this.state.gameState}/>
                </div>
                <div>
                    <div className="place-bet-container">
                        <input type="number"
                               disabled={this.state.gameState == 2}
                        />
                        <button className="bg-green"
                                disabled={this.state.gameState == 2}>
                            PLACE BET
                        </button>
                    </div>
                    <div>
                        <ProfileBet game={this.props.game}/>
                    </div>
                </div>
            </div>
        )
    }
}

JackpotGame.propTypes = {
    game: React.PropTypes.object
};

JackpotGame.defaultProps = {};
