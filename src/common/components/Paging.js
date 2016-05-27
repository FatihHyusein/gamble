import BaseComponent from '../../base/BaseComponent';

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
        if (page < 1 || page > this.pagesCount) {
            if (page != 1 && this.pagesCount != 0) {
                return;
            }
        }

        this.props.getItems(page);
    }


    render() {
        const totalItems = this.props.totalItems;

        this.pagesCount = Math.ceil(totalItems / this.props.itemsPerPage);
        var pages = [];
        for (let i = 1; i <= this.pagesCount; i++) {
            var itemClass = '';
            if (i == this.props.currentPage) {
                itemClass = "active";
            }

            pages.push(<li key={i}
                           onClick={this.getPage.bind(this,i)}
                           className={`noselect ${itemClass}`}>{i}</li>);
        }

        return (
            <div className="paging">
                <div className={`prev-page-btn ${(this.props.currentPage === 1)?'disabled':''}`}
                     onClick={this.getPage.bind(this,this.props.currentPage - 1)}></div>
                <ul>
                    {pages}
                </ul>

                <div className={`next-page-btn ${(this.props.currentPage === this.pagesCount)?'disabled':''}`}
                     onClick={this.getPage.bind(this,this.props.currentPage + 1)}></div>
            </div>
        )
    }
}


Paging.propTypes = {
    totalItems: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    getItems: React.PropTypes.func,
    itemsPerPage: React.PropTypes.number
};


module.exports = Paging;
