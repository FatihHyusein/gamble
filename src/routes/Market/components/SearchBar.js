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
        this.state = getStateFromStores();
    }

    render() {
        var cartLink = `/market${(window.location.pathname.indexOf('/cart') > -1) ? '' : '/cart'}`;

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
                        <input type="text" placeholder={this.props.inputPlaceholder}/>
                        <div className="search-btn">
                            <CommonComponents.SvgIcon iconName="searchico"/>
                        </div>
                    </div>
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

SearchBar.propTypes = {};

module.exports = SearchBar;
