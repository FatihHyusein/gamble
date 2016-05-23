import BaseComponent from '../../../base/BaseComponent';

export default
class DepositList extends BaseComponent {

    constructor() {
        super();
    }

    render() {
        const deposits = this.props.players;

        var depositList = deposits.map((deposit, idx)=> {
            return (<div key={idx}>
                <CommonComponents.SvgIcon iconName={deposit.profileIcon}/>
                {deposit.name} HAS DEPOSITED
                <CommonComponents.SvgIcon iconName='muffin-currency'/>
                {deposit.betAmount}
                <CommonComponents.SvgIcon iconName={deposit.gunIcon}/>
            </div>)
        });

        return (
            <div id="deposit-list">
                {depositList}
            </div>
        )
    }
}

DepositList.propTypes = {players: React.PropTypes.array};
