class MarketItem extends Component {
    render() {
        const item = this.props.item;


        return (
            <div className="market-item">
                <img src={item.image}/>
                <div className="description">{item.description}</div>
                <div className="price-container">
                    <div><CommonComponents.SvgIcon iconName="fb"/>{item.price}</div>
                    <CommonComponents.SvgIcon iconName="fb"/>
                </div>
            </div>
        )
    }
}

module.exports = MarketItem;
