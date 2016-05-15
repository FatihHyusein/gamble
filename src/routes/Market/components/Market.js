import React, {Component} from 'react'
import SearchBar from './SearchBar';
import MarketItem from './MarketItem';
import MarketItemPopup from './MarketItemPopup';
import Paging from './Paging';

class Market extends Component {
    constructor() {
        super();
        this.openMarketItem = this.openMarketItem.bind(this);
        this.closeMarketItem = this.closeMarketItem.bind(this);

        this.state = {
            modalIsOpen: false,
            selectedItem: {}
        };

    }

    openMarketItem(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item
        });
    }

    closeMarketItem(item) {
        this.setState({modalIsOpen: false});
    }

    render() {
        var marketItems = this.props.marketItems.map((item, idx) =>
            <MarketItem key={idx} item={item}
                        onClick={this.openMarketItem}
            />
        );

        return (
            <div id="market">
                <MarketItemPopup item={this.state.selectedItem} modalIsOpen={this.state.modalIsOpen}
                                 closeModal={this.closeMarketItem}/>
                <div className="top-container">
                    <SearchBar
                        header="Market Place"
                        inputPlaceholder="search for an item..."/>
                </div>
                <div className="items-container">
                    {marketItems}
                    <Paging totalItems={marketItems.length}/>
                </div>
            </div>
        )
    }
}

Market.defaultProps = {
    marketItems: [
        {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        }, {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        },
        {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        }, {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        },
        {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        }, {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        },
        {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        }, {
            image: 'staticFiles/images/ak.png',
            price: '25000',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        },
    ]
};


module.exports = Market;
