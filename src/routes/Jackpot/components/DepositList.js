import BaseComponent from '../../../base/BaseComponent';
import JackpotGameStore from '../../../stores/games/JackpotGameStore';

export default
class DepositList extends BaseComponent {

    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
        // this.forceUpdate();
    }

    render() {
        if (!this.deposits) {
            this.deposits = this.props.players;
        }

        var newItemStyle = {
            backgroundColor: "blue",
            height: 0 + 'px',
            visibility: "hidden",
            opacity: 0
        };


        var depositList = this.deposits.map((deposit, idx)=> {
            let rowClass = (idx % 2) ? 'even' : 'odd';

            let gameStateData;
            let person;

            if (deposit.isKilled) {
                person = (
                    <div key={idx} className={`${rowClass} killed`}>
                         <span>EVIL MUFFIN
                             <span className="killer-gun">
                            <CommonComponents.SvgIcon
                                iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount})}/>
                                 </span>
                             <CommonComponents.SvgIcon iconName={deposit.profileIcon}/>
                             {deposit.name}
                        </span>
                    </div>
                )
            }

            else if (deposit.isWinner) {
                person = (
                    <div key={idx} className={`${rowClass} winner`}>
                         <span>
                              <CommonComponents.SvgIcon iconName={deposit.profileIcon}/>
                             {deposit.name}
                             <span className="killer-gun">
                            <CommonComponents.SvgIcon
                                iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount})}/>
                                 </span>
                             EVIL MUFFIN
                        </span>
                    </div>
                )
            }

            else {
                if (this.props.gameState == 1) {
                    gameStateData = (
                        <span>
                         <span className="text">HAS DEPOSITED</span>
                         <CommonComponents.SvgIcon iconName='muffin-currency'/>
                            {deposit.betAmount}
                    </span>
                    )
                }
                else {
                    gameStateData = <span className="text"> PLAYS WITH</span>
                }
                person = (
                    <div key={idx} className={rowClass}>
                        <CommonComponents.SvgIcon iconName={deposit.profileIcon}/>
                        {deposit.name}
                        {gameStateData}
                    <span className="gun-icon-wrapper">
                        <CommonComponents.SvgIcon
                            iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount})}/>
                    </span>
                    </div>
                )
            }

            return person
        });

        return (
            <div id="deposit-list">
                {depositList}
            </div>
        )
    }
}

DepositList.propTypes = {
    players: React.PropTypes.array,
    gameState: React.PropTypes.number
};
