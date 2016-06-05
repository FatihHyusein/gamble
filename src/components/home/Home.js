import GameStore from '../../stores/games/GameStore';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';
import {Link} from 'react-router'

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
                        <h1>the only place where you bet muffins and win cs:go skins</h1>
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
                <div className="home-bottom-text-container">
                    <div className="app-description-container">
                        <div className="header">
                            By playing in csgo muffin is the easiest way to win skins.
                        </div>
                        <div className="descriptions-container">
                            <div className="description-inner-container">
                                <div className="header">
                                    How does it works?
                                </div>
                                <div className="description">Log in & Deposit</div>
                                <div className="description">Play a game which you prefer</div>
                                <div className="description">Win & withdraw from market</div>
                            </div>

                            <div className="description-inner-container">
                                <div className="header">
                                    Earn even more by recruiting your friends
                                </div>
                                <div className="description">The only thing you have to do is to sit and enjoy your income.</div>
                                <div className="description"><Link className="pointer" to="/muffinChef">Click here to learn more about our referal system.</Link></div>
                            </div>
                        </div>
                    </div>
                    <GameList />
                </div>
            </div>
        )
    }
}


export default Home;
