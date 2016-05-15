import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Game extends Component {
    constructor(props) {
        super(props);
        this.openGame = this.openGame.bind(this);
    }

    openGame() {
        if (this.props.game.url) {
            browserHistory.push(this.props.game.url);
        }
    }

    render() {
        const game = this.props.game;

        return (
            <div onClick={this.openGame} className="game">
                <div>
                    <CommonComponents.SvgIcon iconName={game.icon}/>
                </div>
                <div className="game-header">{game.header}</div>
                <div className="game-description">{game.description}</div>
            </div>
        )
    }
}

export default Game;
