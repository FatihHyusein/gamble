import BaseComponent from '../../../../../base/BaseComponent';

class Terms extends BaseComponent {
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

        return (
            <div id="faq">
                {questions}
            </div>
        )
    }
}


Terms.defaultProps = {
    questions: [
        {
            question: "Introduction",
            answer: `By using CSGOMuffin.com you agree to the following terms of service. Violators may be

banned from our service indefinitely. CSGOMuffin.com reserves the rights to change this 

document without notice. 

You must be at least 18 [eighteen] years of age to use this website. CSGOMuffin.com has the 

right to request identification and documents to verify your age. While your verification is in 

process, CSGOMuffin.com has the right to freeze your account to prevent under­age gambling.

If you have any disagreements with our terms and conditions or parts

conditions, you must immediately stop using CSGOMuffin.com`
        },
        {
            question: "Ownership",
            answer: `All materials on this site are the intellectual property of CSGOMuffin.com or their respective

            entities and you may not use any of the content you see here for commercial use without

            permission. Exclusive rights for CS:GO and its related virtual items belong to Steam and the

Valve corporation.`
        },
        {
            question: "Privacy Policy",
            answer: `Steam profiles are used for identification across the site. By using our service you acknowledge 

that your Steam profile, name and avatar may be shared with other users. CSGOMuffin.com will 

never ask to collect or share the personal information of any of our users.`
        },
        {
            question: "Limited Liability",
            answer: `CSGOMuffin.com is not responsible for trade/account bans that may appear as a resulting of

accepting trades from our bots. CSGOMuffin.com has no responsibility for missed bets as a 

result of network problems. Avoid placing important bets in the last seconds before the time 

expires and always be ensure a stable connection before placing bets.`
        },
        {
            question: "Acceptable use",
            answer: `You must not use this website in any way that causes, or may cause, damage to the website or

impairment of the availability or accessibility of CSGOMuffin.com in any way which is unlawful, 

illegal, fraudulent or harmful.

You must not conduct any systematic or automated data collection activities on or in relation to 

this website without CSGOMuffin.com's express written consent.`
        },
        {
            question: "No warranties",
            answer: `This website is provided “as is” without any representations or warranties, express or implied.

CSGOMuffin.com makes no representations or warranties in relation to this website or the 

information and materials provided on this website. CSGOMuffin.com does not warrant that this 

website will be constantly available, or available at all or the information on this website is 

complete, true, accurate or non­misleading.`
        }
    ]
};


module.exports = Terms;
