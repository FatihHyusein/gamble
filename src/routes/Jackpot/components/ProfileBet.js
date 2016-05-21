import BaseComponent from '../../../base/BaseComponent';
import Chart from './Chart';

export default
class ProfileBet extends BaseComponent {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Chart/>
            </div>
        )
    }
}
