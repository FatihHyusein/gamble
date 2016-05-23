import BaseComponent from '../../../base/BaseComponent';
import Chart from './Chart';

export default
class ProfileBet extends BaseComponent {

    constructor() {
        super();

        this.state = {
            testProfilePercent: 0.8222,
            chartDimensions: {
                width: 50,
                height: 50
            }
        };
        this.changePercentTest = this.changePercentTest.bind(this);
    }

    changePercentTest() {
        this.setState({testProfilePercent: parseFloat((Math.random()).toFixed(4))});
    }

    componentDidMount() {
        this.setState({
            testProfilePercent: 0.8222,
            chartDimensions: {
                width: this.chartContainer.offsetWidth,
                height: this.chartContainer.offsetHeight
            }
        });
    }

    render() {

        return (
            <div id="profile-bet">
                <div className="profile-money-container">
                    <div className="bet" onClick={this.changePercentTest}>
                        <span>
                            <CommonComponents.SvgIcon iconName={this.props.icon}/> BET
                        </span>
                        <span>
                            {this.props.game.profileBetAmount}
                        </span>
                    </div>
                    <div className="credit">
                        <span>
                            <CommonComponents.SvgIcon iconName="muffin-currency"/> CREDITS
                        </span>
                        <span>
                            6620
                        </span>
                    </div>
                </div>

                <div className="game-info-container">
                    <div className="chart-container" ref={(c)=>this.chartContainer=c}>
                        <Chart
                            profilePercent={ parseFloat(this.props.game.profileBetAmount/this.props.game.jackpot).toFixed(4)}
                            width={this.state.chartDimensions.width} height={this.state.chartDimensions.height}/>
                    </div>
                    <div className="game-info">
                        <div>
                            <span>
                                <CommonComponents.SvgIcon iconName="cup-jackpot"/> JACKPOT
                            </span>
                            <span>
                                {this.props.game.jackpot}
                            </span>
                        </div>
                        <div>
                            <span>
                                <CommonComponents.SvgIcon iconName="players"/> PLAYERS
                            </span>
                            <span>
                                {this.props.game.players.length + 1}
                            </span>
                        </div>
                        <div>
                            <span>
                                <CommonComponents.SvgIcon iconName="lock-roundhash"/> ROUND HASH
                            </span>
                            <span>
                                {this.props.game.roundHash}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="prev-game-info-container">
                    <div>
                        <CommonComponents.SvgIcon iconName={this.props.icon}/>
                        <span>
                            <div>
                                LAST WINNER
                            </div>
                            <div>57%/45%</div>
                        </span>
                    </div>
                    <div>
                        <CommonComponents.SvgIcon iconName={this.props.icon}/>
                        <span>
                            <div>
                                TODAYS LUCKER
                            </div>
                            <div>355%/4%</div>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileBet.defaultProps = {
    icon: 'fb'

};
ProfileBet.propTypes = {game: React.PropTypes.object};
