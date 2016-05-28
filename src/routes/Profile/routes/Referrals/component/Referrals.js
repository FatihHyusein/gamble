import BaseComponent from '../../../../../base/BaseComponent';

class Referrals extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="referrals-page">
                refi
            </div>
        )
    }
}

Referrals.defaultProps = {
    levels: {
        first: 1
    }
};

module.exports = Referrals;
