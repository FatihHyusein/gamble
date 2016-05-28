import GameStore from '../../stores/games/GameStore';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';

import WinnerInfo from './WinInfo';
import GameList from'./GameList';

function getStateFromStores() {
    return {
        winners: GameStore.getGameHistory()
    };
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = getStateFromStores();
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

    componentDidMount() {
        GameStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        GameStore.removeChangeListener(this._onChange);
    }

    render() {
        var winEls = this.state.winners.map((winner, idx)=><WinnerInfo key={idx} win={winner}/>);
        return (
            <div id="home">
                <div className="top-container">
                    <div className="header-container">
                        <h1>the only place where you bet muffins and win cd:go skins</h1>
                    </div>
                    <div className="wins-container">
                        <ReactCSSTransitionGroup transitionName="winner-animate"
                                                 transitionAppear={true}
                                                 transitionAppearTimeout={500}
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={300}>
                            {winEls}
                        </ReactCSSTransitionGroup>

                    </div>
                </div>
                <div>
                    <GameList />
                </div>
            </div>
        )
    }
}


export default Home;
