import JackpotGame from './JackpotGame';
import GameActionCreator from '../../../actions/games/GameActionCreators';
import JackpotStore from '../../../stores/games/JackpotGameStore';
import BaseComponent from '../../../base/BaseComponent';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';

function getStateFromStores() {
    return {
        gameData: JackpotStore.getJackpotData(),
        historyGames: JackpotStore.getHistory()
    }
}

class Jackpot extends Component {
    constructor() {
        super();
        this.state = getStateFromStores();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        BaseComponent.sendViaSocket({
            sendOnConnect: true,
            type: "currentGameStatus",
            data: {
                game: "jackpot"
            }
        })
    }

    render() {
        var history = [];
        var historyContainer = "";
        if (this.state.historyGames && this.state.historyGames.length > 0) {
            history = this.state.historyGames.map((histGame, idx)=> {
                return <JackpotGame key={idx} game={histGame} isHistory={true}/>;
            }).reverse();

            historyContainer = (
                <div className="jackpot-history-container">
                    <ReactCSSTransitionGroup transitionName="history-animate"
                                             transitionEnterTimeout={500}
                                             transitionLeaveTimeout={300}>
                        {history}
                    </ReactCSSTransitionGroup>
                </div>
            );
        }

        return (
            <div>
                <div className="top-container">
                    <div className="header"><h1>JACKPOT</h1></div>
                </div>

                <JackpotGame game={this.state.gameData}/>

                {historyContainer}
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
