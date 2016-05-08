import HeaderStore from '../../stores/HeaderStore';
import HeaderActionCreators from '../../actions/HeaderActionCreators';

import WinnerInfo from './WinInfo';
import GameList from'./GameList';

function getStateFromStores() {
    return {
        innerHeader: HeaderStore.getNewHeader(),
        winners: [
            {
                profileImg: 'staticFiles/icons/test.svg',
                sum: '12',
                game: 'Jackpot'

            },
            {
                profileImg: 'staticFiles/icons/steamLoginIcon.png',
                sum: '12',
                game: 'Jackpot'
            },
            {
                profileImg: 'staticFiles/icons/steamLoginIcon.png',
                sum: '12',
                game: 'Jackpot'
            }
        ]
    };
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = getStateFromStores();
        this.changeInnerHeader = this.changeInnerHeader.bind(this);
        this.updateAll = this.updateAll.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

    changeInnerHeader() {
        this.setState(getStateFromStores());
    }

    updateAll() {
        HeaderActionCreators.changeHeader();
        this.setState(getStateFromStores());
    }

    componentDidMount() {
        //HeaderActionCreators.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        //HeaderActionCreators.removeChangeListener(this._onChange);
    }

    render() {
        var winEls = this.state.winners.map((winner, idx)=><WinnerInfo key={idx} win={winner}/>);
        return (
            <div>
                <div className="top-container">
                    <div><h1>the only place where you bet muffins and win cd:go skins</h1></div>
                    <div>{winEls}</div>
                </div>
                <div>
                    <GameList />
                </div>
            </div>
        )
    }
}


export default Home;
