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
            question: "Wsadasf aosaoi gnoL ABOUT?",
            answer: 'answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123'
        },
        {
            question: "WHAT dasdas asdIS IT ALL ABOUT?",
            answer: 'answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123'
        },
        {
            question: "WHAT58998 6365121065 IS IT ALL ABOUT?",
            answer: 'answer 123, xzcz asdbefore bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123'
        },
        {
            question: "WHAT IS IT ALL ABOUT?",
            answer: 'answer 12'
        },
        {
            question: "WHAT IS IT ALL ABOUT?",
            answer: 'answer 123, before bc. go go go cs tes 123answer 12'
        },
        {
            question: "WHAT IS IT ALL ABOUT?",
            answer: '3, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123'
        },
        {
            question: "WHAT IS IT ALL ABOUT?",
            answer: 'answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123answer 123, before bc. go go go cs tes 123'
        }
    ]
};


module.exports = Terms;
