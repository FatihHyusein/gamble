class JackpotGame extends Component {

    constructor() {
        super();
        // this.state = getStateFromStores();

        this.newValue = this.newValue.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    newValue() {
        if (Math.random() > .5) {
            return Math.round(Math.random() * 100);
        } else {
            return (Math.random() * 100).toFixed(1);
        }
    }

    updateValue() {
    }


    render() {


        return (
            <div>
            </div>
        )
    }

    componentDidMount() {
    }
}

JackpotGame.defaultProps = {};

module.exports = JackpotGame;
