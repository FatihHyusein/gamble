import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class WinInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const win = this.props.win;

        return (
            <div className="win-info-container">
                <span className="win-game">{win.game || 'Jackpot'}: </span>
                <span className="win-sum"> {win.jackpot}M - </span>
                <span><img src={win.icon}/>{win.name}</span>
                <span>
                with {win.percent * 100}% chance
                </span>
            </div>
        )
    }
}

export default WinInfo;
