import {Link} from 'react-router';

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <h1>{this.props.header}</h1>
                <div>
                    <Link to="/market/cart" activeClassName="active">
                        <CommonComponents.SvgIcon iconName="cart"/>
                    </Link>


                    <div className="search-container">
                        <input type="text" placeholder={this.props.inputPlaceholder}/>
                        <div className="search-btn">
                            <CommonComponents.SvgIcon iconName="searchico"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = SearchBar;
