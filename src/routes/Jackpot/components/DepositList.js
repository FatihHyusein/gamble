import BaseComponent from '../../../base/BaseComponent';
import JackpotGameStore from '../../../stores/games/JackpotGameStore';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';

export default
class DepositList extends BaseComponent {

    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        this.deposits = this.props.players;

        var depositList = this.deposits.map((deposit, idx)=> {

            let rowClass = (idx % 2) ? 'even' : 'odd';

            let gameStateData;
            let person;

            if (deposit.isKilled) {
                person = (
                    <div className={`${rowClass} killed`}>
                         <span>EVIL MUFFIN
                             <span className="killer-gun">
                            <CommonComponents.SvgIcon
                                iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount,jackpot:this.props.jackpot})}/>
                                 </span>
                             <img src={deposit.icon} className="profile-icon"/>
                             {deposit.name}
                        </span>
                    </div>
                )
            }

            else if (deposit.isWinner) {
                person = (
                    <div className={`${rowClass} winner`}>
                         <span>
                              <img src={deposit.icon} className="profile-icon"/>
                             {deposit.name}
                             <span className="killer-gun">
                            <CommonComponents.SvgIcon
                                iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount,jackpot:this.props.jackpot})}/>
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
                    <div className={rowClass}>
                        <img src={deposit.icon} className="profile-icon"/>
                        {deposit.name}
                        {gameStateData}
                    <span className="gun-icon-wrapper">
                        <CommonComponents.SvgIcon
                            iconName={JackpotGameStore.getPercentGunIcon({amount:deposit.betAmount,jackpot:this.props.jackpot})}/>
                    </span>
                    </div>
                )
            }

            return (


                <ReactCSSTransitionGroup transitionName="person-animate" key={idx}
                                         transitionAppear={true}
                                         transitionAppearTimeout={500}
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    <div key={idx}>{person}</div>
                </ReactCSSTransitionGroup>)
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
    gameState: React.PropTypes.number,
    jackpot: React.PropTypes.number
};
