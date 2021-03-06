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
                <span className="win-game">{win.game || 'Kill the muffin'}: </span>
                <span className="win-sum"> {win.jackpot}<CommonComponents.SvgIcon iconName="muffin-currency"/> - </span>
                <span><img src={win.icon}/>{win.name}</span>
                <span>
                with {(win.percent * 100).toFixed(2)}% chance
                </span>
            </div>
        )
    }
}

export default WinInfo;
