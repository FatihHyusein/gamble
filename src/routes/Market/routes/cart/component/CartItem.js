import React, {Component} from 'react'
import BaseComponent from '../../../../../base/BaseComponent';

export default
class CartItem extends BaseComponent {
    render() {
        return (
            <tr className="cart-item">
                <td>
                    <img src="staticFiles/images/ak.png" alt=""/>
                </td>
                <td>
                    <span>ITEM</span> {this.props.item.name}
                </td>
                <td>
                    <span>QUALITY</span> {this.props.item.name}
                </td>
                <td>
                    <span>PRICE</span> <CommonComponents.SvgIcon className="currency-icon"
                                                                 iconName="muffin-currency"/> {this.props.item.price}
                </td>

                <td className="remove-icon">
                    <CommonComponents.SvgIcon
                        iconName="remove-x"
                        onClick={this.props.removeCartItem.bind(this, this.props.item)}
                    />
                </td>
            </tr>
        )
    }
}

CartItem.propTypes = {
    item: React.PropTypes.object,
    removeCartItem: React.PropTypes.func
};
