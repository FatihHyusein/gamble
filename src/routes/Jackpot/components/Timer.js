import BaseComponent from '../../../base/BaseComponent';

export default
class Timer extends BaseComponent {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="timer-container">
                <div className="timer-line"></div>
                <div className="timer">
                    <div>
                        <CommonComponents.SvgIcon iconName="fb"/>
                    </div>
                    <div>
                        <div>17</div>
                        <div>seconds</div>
                    </div>
                </div>
            </div>
        )
    }
}
