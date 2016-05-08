import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Game from './Game';

class GameList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var gameEls = this.props.games.map((game, idx)=> <Game key={idx} game={game}/>);
        return (
            <div>
                <div className="header">
                    GAMES
                </div>
                {gameEls}
            </div>
        )
    }
}

GameList.defaultProps = {
    games: [
        {
            url: '/jackpot',
            icon: 'staticFiles/icons/steamLoginIcon.png',
            header: 'Jackpot',
            description: 'Bet muffins'
        },
        {
            url: '/jackpot',
            icon: 'staticFiles/icons/steamLoginIcon.png',
            header: 'Jackpot',
            description: 'Bet muffins'
        },
        {
            url: '/jackpot',
            icon: 'staticFiles/icons/steamLoginIcon.png',
            header: 'Jackpot',
            description: 'Bet muffins'
        },
        {
            url: '/jackpot',
            icon: 'staticFiles/icons/steamLoginIcon.png',
            header: 'Jackpot',
            description: 'Bet muffins'
        }
    ]
};


export default GameList;
