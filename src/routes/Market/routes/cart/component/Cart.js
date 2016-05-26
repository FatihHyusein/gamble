import React, {Component} from 'react'
import BaseComponent from '../../../../../base/BaseComponent';
import CartItem from './CartItem';
import MarketStore from '../../../../../stores/MarketStore';
import MarketActionCreators from '../../../../../actions/MarketActionCreators';

function getStateFromStores() {
    return {
        cartItems: MarketStore.getMyCartItems(),
        totalCartItems: MarketStore.getMyCartItemsCount()
    }
}

class Cart extends BaseComponent {
    constructor() {
        super();

        this.getMyCart = this.getMyCart.bind(this);
        this.removeCartItem = this.removeCartItem.bind(this);
        this.finish = this.finish.bind(this);

        this.state = getStateFromStores();
    }

    componentWillMount() {
        this.getMyCart();
    }

    getMyCart(page) {
        BaseComponent.getAjax({
            url: "cart/getCartItems",
            auth: true,
            params: {},
            successFunction: (data)=> {
                MarketActionCreators.marketCartUpdate(data.items, +data.itemsCount);
            }
        });
    }

    removeCartItem(item) {
        BaseComponent.postAjax({
            url: "cart/removeCartItem",
            auth: true,
            params: {
                itemId: item.item_id
            },
            successFunction: (data)=> {
                MarketActionCreators.marketCartUpdate(data.items, +data.itemsCount);
            }
        });
    }

    finish() {
        BaseComponent.postAjax({
            url: "cart/finish",
            auth: true,
            params: {},
            successFunction: (data)=> {
                MarketActionCreators.marketCartUpdate(data.items, +data.itemsCount);
            }
        });
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
                ORDER
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
        MarketStore.addCartItemsChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MarketStore.removeCartItemsChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

module.exports = Cart;
