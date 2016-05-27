import router, {Router, browserHistory, Link} from 'react-router'
import DepositStore from '../../../stores/DepositStore';

function getStateFromStores() {
    return {
        cartItemsCount: DepositStore.getCartCount()
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
        var cartLink = `/deposit${(window.location.pathname.indexOf('/cart') > -1) ? '' : '/cart'}`;
        var depositBtn = <button className="bg-green" onClick={this.props.onDeposit.bind(this)}>ADD</button>;
        if (this.state.cartItemsCount < 1) {
            cartLink = '/deposit';
            depositBtn = '';
        }


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
                    {depositBtn}
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
                </div>
            </div>
        )
    }

    componentDidMount() {
        DepositStore.addCartItemsChangeListener(this._onChange);
    }

    componentWillUnmount() {
        DepositStore.removeCartItemsChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}


SearchBar.propTypes = {
    onSearch: React.PropTypes.func,
    onDeposit: React.PropTypes.func,
    inputPlaceholder: React.PropTypes.string,
    header: React.PropTypes.string
};

module.exports = SearchBar;


