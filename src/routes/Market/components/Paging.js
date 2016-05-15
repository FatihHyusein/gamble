class Paging extends Component {
    render() {
        const totalItems = this.props.totalItems;

        const pagesCount = Math.ceil(totalItems / 16);
        var pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(<li key={i}>{i}</li>);
        }

        return (
            <div className="paging">
                <ul>
                    {pages}
                </ul>
            </div>
        )
    }
}

module.exports = Paging;
