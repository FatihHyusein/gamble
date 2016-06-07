import BaseComponent from '../../../../../base/BaseComponent';
import {Link} from 'react-router'

class Faq extends BaseComponent {
    constructor() {
        super();

        this.toggleAnswer = this.toggleAnswer.bind(this);

        this.state = {
            expandedItemIdx: null
        }
    }

    toggleAnswer(idx) {
        var i = null;
        if (idx !== this.state.expandedItemIdx) {
            i = idx;
        }
        this.setState({expandedItemIdx: i});

    }

    render() {
        var questions = this.props.questions.map((q, idx)=> {
            return (
                <div key={idx} className="question-container">
                    <div className="question noselect" onClick={this.toggleAnswer.bind(this, idx)}>
                        {q.question}
                    </div>
                    <div className={`answer ${this.state.expandedItemIdx===idx?'expanded':''}`}>
                        {q.answer}
                    </div>
                </div>
            );
        });


        var mc = (
            <div key={questions.length+1} className="question-container">
                <div className="question noselect" onClick={this.toggleAnswer.bind(this, questions.length+1)}>

                    How does the paid referral system work <b>A.K.A. MUFFIN CHEF</b>?
                </div>
                <div className={`answer ${this.state.expandedItemIdx===questions.length+1?'expanded':''}`}>
                    - The paid referral system works like the free referral system, except the amount you can earn.<br/>
                    - MUFFIN CHEF system is made of levels. First level gives you this opportunity:<br/>
                    For every user with your referral code you earn
                    <ul>
                        <li>
                            * <b>10 FREE
                            <span><CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/>
                        </span>
                        </b>
                        </li>
                        <li>
                            * <b>2% of his win in our games</b>
                        </li>
                    </ul>
                    * One simple calculation: if you have <b>100</b> referrals you earn <b>100*10=1000 <span>
                                <CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/></span></b>
                    .
                    If daily a
                    referral wins average <b>1000 <span>
                            <CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/>
                        </span></b>
                    for one month you can earn average <b>100*1000*30*0.02 = 60000
                    <span><CommonComponents.SvgIcon className="currency-icon" iconName="muffin-currency"/></span>
                </b>.<Link to="/profile/referrals"> You can upgrade
                    your profile to MUFFIN CHEF from your profile - referrals tab.</Link> Upgrade your profile now and
                    start enjoying the benefits of
                    <Link to="/profile/referrals"> csgomuffin.com</Link><br/>
                    The bigger <b>MUFFIN CHEF</b> level you have the bigger deals are waiting for you!!!
                </div>
            </div>
        );

        return (
            <div id="faq">
                {questions}
                {mc}
            </div>
        )
    }
}


Faq.defaultProps = {

    questions: [
        {
            question: "How can I deposit skins?",
            answer: `Make sure that your profile is set to public and that you have entered your “trade url”

(instructions on how to find your url can be found in the account panel). Afterwards you can

deposit skins by clicking the "Deposit" button in the top menu.`
        },
        {
            question: "My items are not showing in deposit menu?",
            answer: `If you are not seeing your items in the deposit menu that is because we don’t have accurate

price for the items.`
        },
        {
            question: "How can I withdraw skins?",
            answer: `You can withdraw skins from "Market" in exchange for your Muffins.`
        },
        {
            question: "How does Kill the Muffin (Jackpot) work?",
            answer: `The minimum bet you can place is 10 Muffins. After all players finish their bets, the Evil Muffin

will start killing random people. Once someone kills the Muffin he wins the pot. The higher the

bet, the better the chance to Kill the Evil Muffin.`
        },
        {
            question: "How much are Muffins worth?",
            answer: `Muffins have no real­life value. Instead they are exchanged for CS:GO items from our public shop.

Every 100 Muffins will buy you roughly $1 worth of items. See below for more information.`
        },
        {
            question: "Why did the bot cancel my trade offer?",
            answer: `Our bots automatically cancel trade offers older than 1 hour to make room for new trade offers.`
        },
        {
            question: "How does the free referral system work?",
            answer: `The referral system lets anyone earn Muffins by referring new players to the site. Visit the Account

Panel dashboard to find your unique referral code. Share with friends, in forums, or on social media.

When new players enter your referral code, they’ll receive 20 muffins for FREE and a bonus of 30 muffins after their first deposit. You will get 10 muffins FREE for inviting them.

Muffins every time someone uses your referral code. If you want to earn more check out the next question!`
        }
    ]
};


module.exports = Faq;
