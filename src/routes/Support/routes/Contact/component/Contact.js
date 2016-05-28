import BaseComponent from '../../../../../base/BaseComponent';

class Contact extends BaseComponent {
    constructor() {
        super();

        this.sendForm = this.sendForm.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.issueChanged = this.issueChanged.bind(this);

        this.state = {
            email: '',
            issue: '',
            isValidForm: true
        }
    }

    emailChanged(event) {
        this.setState({
            email: event.target.value
        });
    }

    issueChanged(event) {
        this.setState({
            issue: event.target.value
        });
    }

    sendForm() {
        if (this.validForm()) {
            BaseComponent.postAjax({
                url: "support/contact",
                auth: true,
                params: {
                    email: this.state.email,
                    message: this.state.issue
                },
                successFunction: (data)=> {
                    this.setState({
                        email: '',
                        issue: '',
                        isValidForm: true
                    })
                }
            });
        }
    }

    validForm() {
        if (!this.state.issue) {
            this.setState({isValidForm: false});
            return false;
        }
        if (!this.state.email) {
            this.setState({isValidForm: false});
            return false;
        }

        this.setState({isValidForm: true});

        return true;
    }

    render() {
        var selectValues = this.props.selectValues.map((val)=> {
            return (
                <option value={val.val} key={val.val}>{val.text}</option>
            )
        });

        return (
            <div id="contact">
                <form>
                    <input type="email" placeholder="EMAIL ADDRESS..." value={this.state.email}
                           onChange={this.emailChanged}/>
                    <select>
                        {selectValues}
                    </select>
                    <textarea placeholder="ISSUE..." cols="30" rows="10" value={this.state.issue}
                              onChange={this.issueChanged}>

                    </textarea>
                </form>
                <div className={`empty-error ${this.state.isValidForm?'not-visible':''}`}>
                    All fields are required
                </div>
                <button className="bg-green fright" onClick={this.sendForm}>SUBMIT</button>
                <div className="clearfix"></div>
            </div>
        )
    }
}

Contact.defaultProps = {
    selectValues: [
        {
            val: 'all',
            text: 'Select issue category'
        },
        {
            val: 'other',
            text: 'Other'
        },
        {
            val: 'bug',
            text: 'System Bug'
        },
        {
            val: 'money',
            text: 'Deposit/Withdraw'
        },
        {
            val: 'game',
            text: 'Game'
        },
        {
            val: 'referal',
            text: 'Referrals'
        },
        {
            val: 'idea',
            text: 'Share an idea'
        }]
};

module.exports = Contact;
