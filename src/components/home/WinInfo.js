import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class WinInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const win = this.props.win;

        return (
            <div>
                <span><img src={win.profileImg}/></span>
                JUST WON
                <span className="win-sum">{win.sum}M</span>
                IN
                <span className="win-game">{win.game}</span>
            </div>
        )
    }
}

export default WinInfo;
