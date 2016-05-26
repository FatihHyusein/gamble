import BaseComponent from '../../../base/BaseComponent';

import MarketActionCreators from '../../../actions/MarketActionCreators';
import MarketStore from '../../../stores/MarketStore';

class Paging extends BaseComponent {
    constructor() {
        super();
        this.getPage = this.getPage.bind(this);
    }

    componentDidMount() {
        this.getPage(1);
    }

    componentWillReceiveProps(nextProps) {
    }

    getPage(page) {
        this.props.getItems(page);
    }


    render() {
        const totalItems = this.props.totalItems;

        const pagesCount = Math.ceil(totalItems / this.props.itemsPerPage);
        var pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            var itemClass = '';
            if (i == this.props.currentPage) {
                itemClass = "active";
            }

            pages.push(<li key={i} className={itemClass}>{i}</li>);
        }

        return (
            <div className="paging">
                <button onClick={this.getPage.bind(this,this.props.currentPage - 1)}>prev</button>
                <ul>
                    {pages}
                </ul>
                <button onClick={this.getPage.bind(this,this.props.currentPage + 1)}>NExt</button>
            </div>
        )
    }
}


Paging.propTypes = {
    totalItems: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    getItems: React.PropTypes.func
};

Paging.defaultProps = {
    itemsPerPage: 12
};


module.exports = Paging;
