import BaseComponent from '../../../base/BaseComponent';
import Chart from './Chart';
import UserDataStore from '../../../stores/UserDataStore';

function getCredits() {
    return UserDataStore.getMuffins();
}

export default
class ProfileBet extends BaseComponent {

    constructor() {
        super();

        this.state = {
            chartDimensions: {
                width: 50,
                height: 50
            },
            credits: getCredits()
        };

        this._onChange = this._onChange.bind(this);
    }


    componentDidMount() {
        this.setState({
            chartDimensions: {
                width: this.chartContainer.offsetWidth,
                height: this.chartContainer.offsetHeight
            }
        });

        UserDataStore.addChangeListener(this._onChange);
    }


    componentWillUnmount() {
        UserDataStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            credits: getCredits()
        });
    }

    render() {
        var profilePercent = 0;
        if (this.props.game.jackpot > 0 && this.props.game.profileBetAmount > 0) {
            profilePercent = parseFloat((this.props.game.profileBetAmount / this.props.game.jackpot).toFixed(4));
        }

        var creditsContainer = "";
        var prevGameContainer = "";
        if (this.props.isHistory !== true) {
            creditsContainer = ( <div className="credit">
                        <span className="label">
                            <CommonComponents.SvgIcon iconName="muffin-currency"/> CREDITS
                        </span>
                        <span>
                            {this.state.credits}
                        </span>
            </div>);


            prevGameContainer = (
                <div className="prev-game-info-container">
                    <div className="tcenter">
                        <CommonComponents.SvgIcon iconName={this.props.icon}/>
                        <span >
                            <div className="label">
                                LAST WINNER
                            </div>
                            <div>57%/45%</div>
                        </span>
                    </div>
                    <div className="tcenter">
                        <CommonComponents.SvgIcon iconName={this.props.icon}/>
                        <span>
                            <div className="label">
                                TODAYS LUCKER
                            </div>
                            <div>355%/4%</div>
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div id="profile-bet">
                <div className="profile-money-container">
                    <div className="bet tcenter">
                        <span className="label">
                            <CommonComponents.SvgIcon iconName="dice"/> BET
                        </span>
                        <span>
                            {this.props.game.profileBetAmount}
                        </span>
                    </div>
                    {creditsContainer}
                </div>

                <div className="game-info-container">
                    <div className="chart-container" ref={(c)=>this.chartContainer=c}>
                        <Chart
                            profilePercent={ profilePercent}
                            width={this.state.chartDimensions.width} height={this.state.chartDimensions.height}/>
                    </div>
                    <div className="game-info">
                        <div>
                          <span className="label">
                                <CommonComponents.SvgIcon iconName="cup-jackpot"/> JACKPOT
                            </span>
                            <span>
                                {this.props.game.jackpot}
                            </span>
                        </div>
                        <div>
                            <span className="label">
                                <CommonComponents.SvgIcon iconName="players"/> PLAYERS
                            </span>
                            <span>
                                {this.props.game.players.length}
                            </span>
                        </div>
                        <div>
                            <span className="label">
                                <CommonComponents.SvgIcon iconName="lock-roundhash"/> ROUND HASH
                            </span>
                            <span>
                                {this.props.game.roundHash}
                            </span>
                        </div>
                    </div>
                </div>

                {prevGameContainer}
            </div>
        )
    }
}

ProfileBet.defaultProps = {
    icon: 'fb'

};
ProfileBet.propTypes = {
    game: React.PropTypes.object,
    isHistory: React.PropTypes.bool
};
