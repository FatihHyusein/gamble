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
                            Playing in CSGO Muffin is one of the best ways to have fun and win skins at the same time!
                        </div>
                        <div className="descriptions-container">
                            <div className="description-inner-container">
                                <div className="header">
                                    How does it work?
                                </div>
                                <div className="description">Log in with your Steam account, deposit some skins and play
                                    on one of our amazing games!
                                </div>
                                <div className="description">After you win enough muffins, head to the market and get
                                    the skin you always wanted to have!
                                </div>
                            </div>

                            <div className="description-inner-container">
                                <div className="header">
                                    You can earn even more by helping your friends find out about the site!
                                </div>
                                <div className="description">Just promote your referral code here and there and muffins
                                    will start to come in. All you have to do after that is relax and enjoy your new
                                    skins. Don’t miss that opportunity!
                                </div>
                                <div className="description"><Link className="pointer" to="/muffinChef">Click here to
                                    learn more about our referal system.</Link></div>
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
