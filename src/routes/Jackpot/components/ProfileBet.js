import BaseComponent from '../../../base/BaseComponent';
import Chart from './Chart';

export default
class ProfileBet extends BaseComponent {

    constructor() {
        super();

        this.state = {testProfilePercent: 0.8222};

        this.changePercentTest = this.changePercentTest.bind(this);
    }

    changePercentTest() {
        this.setState({testProfilePercent: parseFloat((Math.random()).toFixed(4))});
    }

    render() {
        return (
            <div>
                <button onClick={this.changePercentTest}>CHANGE PERCENT</button>
                <h1>{this.state.testProfilePercent}</h1>
                <Chart profilePercent={this.state.testProfilePercent}/>
            </div>
        )
    }
}
