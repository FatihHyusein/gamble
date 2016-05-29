import BaseComponent from '../../../../../base/BaseComponent';
import UserDataActionsCreators from '../../../../../actions/UserDataActionsCreators';
import UserDataStore from '../../../../../stores/UserDataStore';

function getStateFromStores() {
    return {
        profile: UserDataStore.getUserData(),
        historyItems: UserDataStore.getHistoryArray()
    };
}

class History extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();

        this._onChange = this._onChange.bind(this);
        this.retrieveHistory = this.retrieveHistory.bind(this);
    }

    retrieveHistory(days) {
        var sendParam = {};
        if (days) {
            sendParam.days = days;
        }

        BaseComponent.getAjax({
            url: "user/history",
            auth: true,
            params: sendParam,
            successFunction: (data)=> {
                UserDataActionsCreators.updateHistoryArray(
                    data.jackpot
                );
                this.setState({
                    days: days
                })
            }
        });
    }

    componentWillMount() {
        this.retrieveHistory(this.props.historyDays.oneDay);
    }

    render() {
        var hisoryRow = this.state.historyItems.map((row, idx)=> {
            return (
                <tr key={idx} className={`${row.winner == true?'win-row':'lose-row'}`}>
                    <td>
                        <CommonComponents.SvgIcon
                            iconName="muffin-currency"/>{row.game_jackpot}
                    </td>
                    <td>
                        <CommonComponents.SvgIcon
                            iconName="muffin-currency"/>{row.bet_amount}
                    </td>
                    <td>
                        <CommonComponents.SvgIcon
                            iconName="muffin-currency"/>{parseInt(row.won_amount)}
                    </td>
                </tr>
            )
        });

        return (
            <div className="history-page">
                <div className="muffin-levels-container">

                </div>

                <div className="history-table-container">
                    <table className="muffin-table">
                        <thead>
                        <tr>
                            <th>
                                JACKPOT
                            </th>
                            <th>
                                BET AMOUNT
                            </th>
                            <th>
                                WON AMONT
                            </th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <td>

                            </td>
                        </tr>
                        </tfoot>
                        <tbody>
                        {hisoryRow}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    componentDidMount() {
        UserDataStore.addChangeListener(this._onChange);
        UserDataStore.addHistoryArrayChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserDataStore.removeChangeListener(this._onChange);
        UserDataStore.removeHistoryArrayChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

History.defaultProps = {
    historyDays: {
        oneDay: 1,
        week: 7,
        month: 30,
        year: 365
    },
    itemsPerPage: 50
};

module.exports = History;
