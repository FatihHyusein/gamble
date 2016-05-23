import BaseComponent from '../../../base/BaseComponent';
import DepositList from './DepositList';
import Timer from './Timer';
import ProfileBet from './ProfileBet';


export default
class JackpotGame extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="jackpot-game">
                <div>
                    <Timer time={this.props.game.startTime}/>
                    <DepositList players={this.props.game.players}/>
                </div>
                <div>
                    <div>
                        <input type="number"/>
                        <button>PLACE BET</button>
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
