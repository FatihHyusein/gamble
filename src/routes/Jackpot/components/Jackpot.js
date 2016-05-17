import JackpotGame from './JackpotGame';

class Jackpot extends Component {
    constructor() {
        super();
    }

    render() {


        return (
            <div>
                <h1>FADX</h1>
                <JackpotGame />
            </div>
        )
    }
}

Jackpot.defaultProps = {};


module.exports = Jackpot;
