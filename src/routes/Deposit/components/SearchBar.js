import router, {Router, browserHistory, Link} from 'react-router'
import DepositStore from '../../../stores/DepositStore';
import BaseComponent from '../../../base/BaseComponent';

function getStateFromStores() {
    return {
        cartItemsCount: DepositStore.getCartCount()
    }
}

class SearchBar extends BaseComponent {
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
        var depositBtn = <button className={`bg-green ${(this.state.cartItemsCount < 1) ? 'not-visible' : ''}`}
                                 onClick={this.props.onDeposit.bind(this)}>deposit</button>;
        if (this.state.cartItemsCount < 1) {
            cartLink = '/deposit';
        }

        var closeBtn = (<Link to="/deposit">
            <button
                className={`bg-red ${(window.location.pathname.indexOf('/cart') > -1) ? '' : 'not-visible'}`}>
                close cart
            </button>
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
                    {depositBtn}
                    <Link to={cartLink} activeClassName="active" className="cart-link">
                        <CommonComponents.SvgIcon iconName="addmuffins"/>
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
        super.componentDidMount();
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


