import React, {Component} from 'react'
import BaseComponent from '../../../../../base/BaseComponent';

export default
class CartItem extends BaseComponent {
    render() {
        return (
            <div id="cart">
                <h2>123</h2>
            </div>
        )
    }
}

CartItem.propTypes = {item: React.PropTypes.object};
