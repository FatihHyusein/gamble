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
            <div>
                <div>
                    <Timer time={this.props.game.startTime}/>
                    <DepositList profiles={this.props.game.players}/>
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

JackpotGame.defaultProps = {};
