import BaseComponent from '../../../../../base/BaseComponent';

class History extends BaseComponent {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="history-page">
                hisot
            </div>
        )
    }
}

History.defaultProps = {
    historyDays: {
        oneDay: 1,
        week: 7,
        month: 30,
        year: 365
    }
};

module.exports = History;
