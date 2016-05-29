import React, {Component} from 'react'
import router, {Router, browserHistory, Link} from 'react-router'
import BaseComponent from '../../../base/BaseComponent';
import SearchBar from './SearchBar';
import MarketItem from './MarketItem';
import MarketItemPopup from './MarketItemPopup';
import Paging from '../../../common/components/Paging';

import MarketActionCreators from '../../../actions/MarketActionCreators';
import MarketStore from '../../../stores/MarketStore';

function getStateFromStores() {
    return {
        modalIsOpen: false,
        selectedItem: {},
        marketItems: MarketStore.getMarketItems(),
        totalMarketItems: MarketStore.getTotalMarketItems(),
        currentPage: MarketStore.getMarketItemsPage(),
        cartItems: MarketStore.getMyCartItems()
    }
}
class Market extends BaseComponent {
    constructor() {
        super();
        this.openMarketItem = this.openMarketItem.bind(this);
        this.closeMarketItem = this.closeMarketItem.bind(this);
        this._onChange = this._onChange.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.getItems = this.getItems.bind(this);
        this.search = this.search.bind(this);

        this.state = getStateFromStores();
    }

    openMarketItem(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item
        });
    }

    addToCart(item) {
        BaseComponent.postAjax({
            url: "cart/addToCart",
            auth: true,
            params: {
                itemId: item.id
            },
            successFunction: (data)=> {
                MarketActionCreators.marketStoreAddItemToCart(data);
            }
        });
    }

    closeMarketItem(item) {
        this.setState({modalIsOpen: false});
    }

    search(searchWord) {
        this.getItems(1, searchWord)
    }

    getItems(page, searchWord) {
        var getParams = {
            page: page
        };

        if (searchWord) {
            getParams.searchWord = searchWord;
        }

        BaseComponent.getAjax({
            url: "market/items",
            auth: false,
            params: getParams,
            successFunction: (data)=> {
                MarketActionCreators.marketStoreUpdateList(data.items, +data.itemsCount.count, page);
            }
        });
    }


    render() {
        var marketItems = [];

        if (this.state.marketItems && this.state.marketItems.length > 0) {
            marketItems = this.state.marketItems.map(item =>
                <MarketItem key={item.id} item={item}
                            openMarketItem={this.openMarketItem}
                            addToCart={this.addToCart}
                />
            );
        }
        else {
            marketItems = (<h1 className="mauto">Items not found</h1>)
        }


        var cart = (this.props.children) ? (<div className="cart-drop-down">
            {this.props.children}
        </div>) : '';
        return (
            <div id="market">
                <MarketItemPopup item={this.state.selectedItem} modalIsOpen={this.state.modalIsOpen}
                                 closeModal={this.closeMarketItem} addToBasket={this.addToCart}/>
                <div className="top-container">
                    <SearchBar
                        header="Market Place"
                        inputPlaceholder="search for an item..."
                        onSearch={this.search}
                    />
                </div>
                <div className="items-container">
                    {cart}
                    <div className="list-items">
                        {marketItems}
                    </div>
                    <Paging totalItems={this.state.totalMarketItems}
                            currentPage={this.state.currentPage}
                            getItems={this.getItems}
                            itemsPerPage={this.props.itemsPerPage}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        MarketStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MarketStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

Market.defaultProps = {
    itemsPerPage: 12
};

module.exports = Market;
