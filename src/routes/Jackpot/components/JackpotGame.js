import BaseComponent from '../../../base/BaseComponent';
import DepositList from './DepositList';
import Timer from './Timer';
import ProfileBet from './ProfileBet';
import UserDataStore from '../../../stores/UserDataStore';
import ToastMessagesActionCreators from '../../../actions/ToastMessagesActionCreators';

export default
class JackpotGame extends BaseComponent {
    constructor() {
        super();

        this.state = {
            gameState: 1
        };

        this.timerStopped = this.timerStopped.bind(this);
        this.placeBet = this.placeBet.bind(this);
        this.betAmountChanged = this.betAmountChanged.bind(this);
    }

    placeBet() {
        if (UserDataStore.getMuffins() < this._betAmount.value || this._betAmount.value < this.props.minBetAmount) {
            ToastMessagesActionCreators.setNewToasts([{
                type: "warning",
                text: "You don't have enough muffins."
            }]);
            return;
        }

        BaseComponent.sendViaSocket({
            type: 'placeBet',
            data: {
                betAmount: this._betAmount.value
            }
        });
    }

    betAmountChanged() {
        // if (!parseFloat(this._betAmount.value) || parseFloat(this._betAmount.value) < this.props.minBetAmount) {
        //     this._betAmount.value = this.props.minBetAmount;
        // }
        // else if (parseFloat(this._betAmount.value) > UserDataStore.getMuffins()) {
        //     this._betAmount.value = UserDataStore.getMuffins();
        // }
        // else {
        this._betAmount.value = Math.round(this._betAmount.value);
        // }
    }

    componentDidMount() {
        if (this._betAmount) {
            this._betAmount.value = this.props.minBetAmount;
        }
    }

    timerStopped() {
        // this.setState({gameState: 2})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isHistory) {
            return;
        }


        if (nextProps.game && nextProps.game.startTime > 0) {
            if (this.state.gameState != 1) {
                this.setState({gameState: 1})
            }
        }

        else if (nextProps.game && nextProps.game.startTime < 1) {
            if (this.state.gameState != 2) {
                this.setState({gameState: 2})
            }
        }
    }

    render() {


        var betInputContainer = '';
        var betTimer = '';
        if (this.props.isHistory !== true) {
            betInputContainer = (
                <div className="place-bet-container">
                    <input type="number"
                           onChange={this.betAmountChanged}
                           disabled={this.state.gameState == 2 && false}
                           ref={(c) => this._betAmount = c}
                    />
                    <button className="bg-green" onClick={this.placeBet}
                            disabled={this.state.gameState == 2 && false}>
                        PLACE BET
                    </button>
                </div>
            );

            betTimer = (
                <Timer time={this.props.game.startTime}
                       onTimerStopped={this.timerStopped}
                       timerStarted={this.props.game.timerStarted}
                       isHistory={this.props.isHistory}/>
            )
        }

        return (
            <div id="jackpot-game">
                <div>
                    {betTimer}
                    <DepositList players={this.props.game.players}
                                 gameState={this.state.gameState}
                                 jackpot={this.props.game.jackpot}/>
                </div>
                <div>
                    {betInputContainer}
                    <div>
                        <ProfileBet game={this.props.game}
                                    isHistory={this.props.isHistory}
                                    dailyStatus={this.props.dailyStatus}/>
                    </div>
                </div>
            </div>
        )
    }
}

JackpotGame.propTypes = {
    game: React.PropTypes.object,
    isHistory: React.PropTypes.bool,
    dailyStatus: React.PropTypes.object
};

JackpotGame.defaultProps = {
    minBetAmount: 10
};
