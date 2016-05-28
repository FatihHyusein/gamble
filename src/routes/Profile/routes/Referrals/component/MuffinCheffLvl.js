import BaseComponent from '../../../../../base/BaseComponent';


export default
class MuffinCheffLvl extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        var priceContainer = (
            <div className="price-container">
                {parseInt(this.props.price) > 0 ? parseInt(this.props.price) : ''}<CommonComponents.SvgIcon
                iconName="muffin-currency"/>
            </div>
        );

        var upgradeBtn = (<button className="bg-green" onClick={this.props.onUpgrade.bind(this)}>Upgrade</button>);

        if (this.props.isMyLvl) {
            priceContainer = (
                <div className="price-container img-cont">
                    <img src={this.props.profileIcon}/>
                </div>
            );

            upgradeBtn = (
                <button className="bg-green" onClick={this.props.onUpgrade.bind(this)}>Upgrade to next</button>);
        }

        var topText = (
            <div className="top-text">
                Muffin Chef Level <span>{this.props.lvl}</span>
            </div>
        );
        if (this.props.price == 0) {
            topText = (
                <div className="top-text">
                    COMING SOON!!!
                </div>
            );
        }

        return (
            <div className={`muffin-lvl chef-lvl-${this.props.lvl}`}>
                <div className="img-container">
                    {topText}
                    {priceContainer}
                </div>
                <div className="slided-text">
                    {this.props.info ? this.props.info.description : 'SOON!!!'}

                    {upgradeBtn}
                </div>
            </div>
        )
    }
}


MuffinCheffLvl.propTypes = {
    isMyLvl: React.PropTypes.bool,
    lvl: React.PropTypes.any,
    price: React.PropTypes.any,
    info: React.PropTypes.object,
    profileIcon: React.PropTypes.any,

    onUpgrade: React.PropTypes.func
};
