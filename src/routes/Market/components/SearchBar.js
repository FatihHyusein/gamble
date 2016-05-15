class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <h1>{this.props.header}</h1>
                <div>
                    <CommonComponents.SvgIcon iconName="yt"/>
                    <div className="search-container">
                        <input type="text" placeholder={this.props.inputPlaceholder}/>
                        <div className="search-btn">
                            <CommonComponents.SvgIcon iconName="fb"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = SearchBar;
