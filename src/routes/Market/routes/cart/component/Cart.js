import React, {Component} from 'react'
import BaseComponent from '../../../../../base/BaseComponent';
import CartItem from './CartItem';
import MarketStore from '../../../../../stores/MarketStore';


function getStateFromStores() {
    return {
        cartItems: MarketStore.getMyCartItems()
    }
}

class Cart extends BaseComponent {
    constructor() {
        super();

        this.state = getStateFromStores();
    }

    componentWillMount() {

    }

    render() {
        var carItems = this.state.cartItems.map((cartItem, idx)=> {
            return (<CartItem key={idx} item={cartItem}/>)
        });
        var orderRow = (<div>TOTAL (muffins) </div>);

        return (
            <div id="cart">
                {orderRow}
                <div className="items-container">
                    {carItems}
                </div>
                {orderRow}
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

module.exports = Cart;
