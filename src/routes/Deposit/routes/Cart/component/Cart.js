import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import BaseComponent from '../../../../../base/BaseComponent';
import CartItem from './CartItem';
import DepositStore from '../../../../../stores/DepositStore';
import DepositActionCreators from '../../../../../actions/DepositActionCreators';

function getStateFromStores() {
    return {
        cartItems: DepositStore.getCartItems(),
        totalCartItems: DepositStore.getCartCount()
    }
}

class Cart extends BaseComponent {
    constructor() {
        super();

        this.removeCartItem = this.removeCartItem.bind(this);
        this.finish = this.finish.bind(this);

        this.state = getStateFromStores();
    }


    removeCartItem(item) {
        DepositActionCreators.depositRemoveItemFromCart(item);
    }

    finish() {
        BaseComponent.postAjax({
            url: "deposit",
            auth: true,
            params: {
                items: this.state.cartItems.map(itm=> itm.id)
            },
            successFunction: (data)=> {
                BaseComponent.getAjax({
                    url: "deposit/userItems",
                    auth: true,
                    params: {
                        page: 1
                    },
                    successFunction: (data)=> {
                        DepositActionCreators.clearCart(data.items, +data.itemsCount.count, page);
                    }
                });

            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.totalCartItems < 1) {
            browserHistory.push('/deposit');
            return false;
        }
        return true;
    }

    render() {
        var totalSum = 0;
        var carItems = this.state.cartItems.map((cartItem, idx)=> {
            totalSum += parseFloat(cartItem.price);
            return (<CartItem key={idx} item={cartItem} removeCartItem={this.removeCartItem}/>)
        });
        var orderRow = (<div>TOTAL <span>({this.state.totalCartItems} items)</span>
            <i className="currency-icon"><CommonComponents.SvgIcon
                iconName="muffin-currency"/></i> {totalSum}

            <button className="bg-green"
                    onClick={this.finish}>
                deposit
            </button>
        </div>);


        return (
            <div id="cart">
                <table>
                    <thead>
                    <tr>
                        <th colSpan="5">
                            {orderRow}
                        </th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <td colSpan="5">{orderRow}</td>
                    </tr>
                    </tfoot>

                    <tbody>
                    {carItems}
                    </tbody>

                </table>
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

module.exports = Cart;
