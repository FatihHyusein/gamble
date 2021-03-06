import BaseComponent from '../../../base/BaseComponent';


export default
class ProfileOverview extends BaseComponent {
    constructor() {
        super();

        this.handleTradeUrlChange = this.handleTradeUrlChange.bind(this);
        this.handleParentRefChange = this.handleParentRefChange.bind(this);
        this.state = {
            parentRefInputVal: "",
            tradeUrlInputVal: ""
        }
    }

    handleTradeUrlChange(event) {
        this.setState({
            tradeUrlInputVal: event.target.value
        });
    }

    handleParentRefChange(event) {
        this.setState({
            parentRefInputVal: event.target.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.profileData) {
            this.setState({
                parentRefInputVal: this.props.profileData.parentRefCode || "",
                tradeUrlInputVal: this.props.profileData.tradeUrl || ""
            })
        }
    }

    render() {
        const pr = this.props.profileData;

        var parentRefInfo = (!pr.parentRefCode) ? '' :
            (
                <div className="parent-ref-code">
                    Parent referral code: {pr.parentRefCode}
                </div>
            );

        var parentRefInput = (pr.parentRefCode) ? '' :
            (
                <div className="trade-url-container">
                    <div className="input-label">Enter referral code if you are invited by someone and you will earn 5%
                        bonus on your first deposit – up to 3 dollars.
                    </div>
                    <div>
                        <input type="text"
                               defaultValue={pr.parentRefCode}
                               onChange={this.handleParentRefChange}/>
                        <button className="bg-green"
                                onClick={this.props.onAddReferralCode.bind(this,this.state.parentRefInputVal)}>
                            Add
                        </button>
                    </div>
                </div>
            );


        return (
            <div className="profile-overview">

                <div className="info-container">
                    <div className="profile-img-container">
                        <img src={pr.profileIcon} className={`muffin-cheff-lvl-${pr.cheffBadge || 0}`}/>
                    </div>
                    <div className="details-container">
                        <div className="name">
                            {pr.name}
                        </div>
                        <div className="muffins">
                            <CommonComponents.SvgIcon iconName="muffin-currency"/> {pr.muffins}
                        </div>

                        <div className="ref-code">
                            Your referral code: <span>{pr.referralCode}</span>
                            <div>
                                Don’t forget to share this code with all your friends on Steam, social media and forums! You
                                will earn 2% from the first deposit of your referrals!
                            </div>
                        </div>
                        {parentRefInfo}
                    </div>
                </div>

                <div className="input-data-container">
                    <div className="trade-url-container">
                        <div className="input-label">Your trade url:</div>
                        <div>
                            <input type="text"
                                   onChange={this.handleTradeUrlChange}
                                   defaultValue={pr.tradeUrl}
                            />
                            <button className="bg-green"
                                    onClick={this.props.onUpdateTradeUrl.bind(this,this.state.tradeUrlInputVal)}>
                                Change Trade URL
                            </button>
                        </div>
                        <div className="tcenter">
                            To find your steam trade url click here <br/>
                            <a className="c-green"
                               target="_blank"
                               href="https://steamcommunity.com/id/me/tradeoffers/privacy">
                                https://steamcommunity.com/id/me/tradeoffers/privacy
                            </a><br/>
                            Or sign in into your steam/inventory/trade offers/who can send me trade offers. You will
                            find your trade URL on the bottom of the page.
                        </div>
                    </div>
                    {parentRefInput}
                </div>
            </div>
        )
    }
}


ProfileOverview.propTypes = {
    profileData: React.PropTypes.object,
    onUpdateTradeUrl: React.PropTypes.func,
    onAddReferralCode: React.PropTypes.func
};
