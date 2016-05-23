import BaseComponent from '../../../base/BaseComponent';

export default
class Timer extends BaseComponent {

    constructor() {
        super();
    }

    render() {
        return (
            <div id="timer-container">
                <div className="timer-line"></div>
                <div className="timer">
                    <CommonComponents.SvgIcon iconName="fb"/>
                    <div className="timer-counter">
                        <div className="seconds">{this.props.time}</div>
                        <div>seconds</div>
                    </div>
                </div>
            </div>
        )
    }
}

Timer.propTypes = {time: React.PropTypes.number};

