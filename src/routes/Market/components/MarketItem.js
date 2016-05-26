import BaseComponent from '../../../base/BaseComponent';
import UserDataStore from '../../../stores/UserDataStore';

function getStateFromStores() {
    return {
        profileMuffins: UserDataStore.getMuffins()
    }
}

export default
class MarketItem extends BaseComponent {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.state = getStateFromStores();
    }

    render() {
        const item = this.props.item;
        var cartColor = 'svg-bg-green';
        if (this.state.profileMuffins < item.price) {
            cartColor = 'svg-bg-red';
        }

        return (
            <div className="market-item">
                <img src={item.image} onClick={this.props.openMarketItem.bind(this, item)}/>
                <div className="description" onClick={this.props.openMarketItem.bind(this, item)}>{item.name}</div>

                <div className="price-container" onClick={this.props.addToCart.bind(this, item)}>
                    <div><CommonComponents.SvgIcon iconName="muffin-currency"/>{item.price}</div>
                    <span className={cartColor}><CommonComponents.SvgIcon iconName="cart"/></span>
                </div>
            </div>
        )
    }

    componentDidMount() {
        UserDataStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserDataStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

MarketItem.propTypes = {
    item: React.PropTypes.object,
    openMarketItem: React.PropTypes.func,
    addToCart: React.PropTypes.func
};
