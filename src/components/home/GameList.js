import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Game from './Game';

class GameList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var gameEls = this.props.games.map((game, idx)=> <Game key={idx} game={game}/>);
        return (
            <div className="game-list-container">
                <div className="header">
                    GAMES
                </div>
                <div className="games-container">
                    {gameEls}
                </div>
            </div>
        )
    }
}

GameList.defaultProps = {
    games: [
        {
            url: '/jackpot',
            icon: 'jackpot',
            header: 'JACKPOT',
            description: 'Bet your muffins against other players. The more you bet the more you get.'
        },
        {
            url: '',
            icon: 'coinflip',
            header: 'COIN FLIP',
            description: 'Play agains other players with a fixed amount of muffins. Chances of winning are 50/50'
        },
        {
            url: '',
            icon: 'roulette',
            header: 'COMING SOON',
            description: ''
        },
        {
            url: '',
            icon: 'box',
            header: 'COMING SOON',
            description: ''
        }
    ]
};


export default GameList;
