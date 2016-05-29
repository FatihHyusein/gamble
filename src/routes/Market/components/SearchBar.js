import router, {Router, browserHistory, Link} from 'react-router'
import MarketStore from '../../../stores/MarketStore';

function getStateFromStores() {
    return {
        cartItemsCount: MarketStore.getMyCartItemsCount()
    }
}

class SearchBar extends Component {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.search = this.search.bind(this);
        this.state = getStateFromStores();
    }

    search() {
        this.props.onSearch(this.searchInput.value);
    }


    render() {
        var cartLink = `/market${(window.location.pathname.indexOf('/cart') > -1) ? '' : '/cart'}`;

        var closeBtn = (<Link to="/market">
            <button className={`bg-red ${(window.location.pathname.indexOf('/cart') > -1) ? '' : 'not-visible'}`}>close cart</button>
        </Link>);


        var cartItemsCounter = '';
        if (this.state.cartItemsCount) {
            cartItemsCounter = ( <div className="cart-items-count">
                {this.state.cartItemsCount}
            </div>);
        }

        return (
            <div className="search-bar">
                <h1>{this.props.header}</h1>
                <div>
                    <Link to={cartLink} activeClassName="active" className="cart-link">
                        <CommonComponents.SvgIcon iconName="cart"/>
                        {cartItemsCounter}
                    </Link>


                    <div className="search-container">
                        <input type="text" placeholder={this.props.inputPlaceholder} ref={(c)=>this.searchInput=c}/>
                        <div className="search-btn" onClick={this.search}>
                            <CommonComponents.SvgIcon iconName="searchico"/>
                        </div>
                    </div>

                    {closeBtn}
                </div>
            </div>
        )
    }

    componentDidMount() {
        MarketStore.addCartItemsChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MarketStore.removeCartItemsChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

SearchBar.propTypes = {
    onSearch: React.PropTypes.func,
    inputPlaceholder: React.PropTypes.string,
    header: React.PropTypes.string
};

module.exports = SearchBar;
