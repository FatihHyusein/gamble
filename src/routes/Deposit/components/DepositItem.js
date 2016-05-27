import BaseComponent from '../../../base/BaseComponent';

export default
class DepositItem extends BaseComponent {
    constructor() {
        super();

        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem() {
        if (this.props.item.isSelected) {
            this.props.removeFromCart(this.props.item)
        }
        else {
            this.props.addToCart(this.props.item)
        }
    }

    render() {
        const item = this.props.item;
        var isSelectedClassName = item.isSelected ? 'selected' : '';

        return (
            <div className={`market-item ${isSelectedClassName}`} onClick={this.toggleItem}>
                <img src={item.image}/>
                <div className="description">{item.name}</div>

                <div className="price-container">
                    <div><CommonComponents.SvgIcon iconName="muffin-currency"/>{item.price}</div>
                    <span><CommonComponents.SvgIcon iconName="cart"/></span>
                </div>
            </div>
        )
    }
}

DepositItem.propTypes = {
    item: React.PropTypes.object,
    addToCart: React.PropTypes.func,
    removeFromCart: React.PropTypes.func
};
