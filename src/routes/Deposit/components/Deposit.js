import React, {Component} from 'react'
import router, {Router, browserHistory, Link} from 'react-router'
import BaseComponent from '../../../base/BaseComponent';
import SearchBar from './SearchBar';
import DepositItem from './DepositItem';
import Paging from '../../../common/components/Paging';

import DepositActionCreators from '../../../actions/DepositActionCreators';
import DepositStore from '../../../stores/DepositStore';

function getStateFromStores() {
    return {
        depositItems: DepositStore.getDepositItems(),
        totalDepositItems: DepositStore.getDepositItemsCount(),
        currentPage: DepositStore.getDepositPageNumber(),
        cartItems: DepositStore.getCartItems()
    }
}

class Deposit extends BaseComponent {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.getItems = this.getItems.bind(this);
        this.search = this.search.bind(this);
        this.finish = this.finish.bind(this);

        this.state = getStateFromStores();
    }


    addToCart(item) {
        DepositActionCreators.depositAddItemToCart(item);
    }

    removeFromCart(item) {
        DepositActionCreators.depositRemoveItemFromCart(item);
    }

    search(searchWord) {
        this.getItems(1, searchWord)
    }

    getItems(page, searchWord, isClearCart) {
        var getParams = {
            page: page
        };

        if (searchWord) {
            getParams.searchWord = searchWord;
        }

        BaseComponent.getAjax({
            url: "deposit/userItems",
            auth: true,
            params: getParams,
            successFunction: (data)=> {
                if (isClearCart) {
                    DepositActionCreators.clearCart(data.items, +data.itemsCount.count, page);
                }
                else {
                    DepositActionCreators.depositUpdateList(data.items, +data.itemsCount.count, page);
                }
            }
        });
    }

    finish() {
        BaseComponent.postAjax({
            url: "deposit",
            auth: true,
            params: {
                items: this.state.cartItems.map(itm=> itm.id)
            },
            successFunction: (data)=> {
                DepositActionCreators.clearCart(data.items, +data.itemsCount.count, page);
                DepositActionCreators.depositUpdateList(data.items, +data.itemsCount.count, page);
            }
        });
    }


    render() {
        var depositItems = [];

        if (this.state.depositItems && this.state.depositItems.length > 0) {
            depositItems = this.state.depositItems.map(item =>
                <DepositItem key={item.id} item={item}
                             addToCart={this.addToCart}
                             removeFromCart={this.removeFromCart}
                />
            );
        }
        else {
            depositItems = (<h1 className="mauto">Items not found</h1>)
        }


        var cart = (this.props.children) ? (<div className="cart-drop-down">
            {this.props.children}
        </div>) : '';
        return (
            <div id="deposit">
                <div className="top-container">
                    <SearchBar
                        header="DEPOSIT"
                        inputPlaceholder="search for an item..."
                        onSearch={this.search}
                        onDeposit={this.finish}
                    />
                </div>
                <div className="items-container">
                    {cart}
                    <div className="list-items">
                        {depositItems}
                    </div>
                    <Paging totalItems={this.state.totalDepositItems}
                            currentPage={this.state.currentPage}
                            getItems={this.getItems}
                            itemsPerPage={this.props.itemsPerPage}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        DepositStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        DepositStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

Deposit.defaultProps = {
    itemsPerPage: 64
};

module.exports = Deposit;
