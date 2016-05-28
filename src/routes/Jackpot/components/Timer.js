import BaseComponent from '../../../base/BaseComponent';
import d3 from 'd3';
import JackpotStore from '../../../stores/games/JackpotGameStore';
import GameActionCreators from '../../../actions/games/GameActionCreators';

function getStateFromStores() {
    return {
        remainTime: JackpotStore.getJackpotData().startTime
    }
}

export default
class Timer extends BaseComponent {

    constructor() {
        super();

        this.startTimer = this.startTimer.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = getStateFromStores();
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isHistory) {
            return;
        }

        if (nextProps.time && nextProps.time != this.state.remainTime) {
            this.setState(getStateFromStores());
        }

        if (nextProps.timerStarted === true) {
            this.startTimer();
        }
    }

    componentDidMount() {
        if (this.props.isHistory) {
            return;
        }
        JackpotStore.addTimerListener(this._onChange);
    }

    render() {
        this.bgColor = d3.interpolateRgb('red', 'green')(this.state.remainTime * 3 / 100);

        var timeLineStyle = {
            backgroundColor: this.bgColor,
            borderWidth: this.timerLineBorderWidth || 0
        };
        if (this.props.timerDuration == this.state.remainTime) {
            timeLineStyle.borderWidth = 0;
        }

        var timerCounterStyle = {
            color: this.bgColor
        };

        var iconCounterStyle = {
            fill: this.bgColor
        };

        return (
            <div id="timer-container">
                <div className="timer-line" ref={(c)=>this.timerLine=c}
                     style={timeLineStyle}
                ></div>
                <div className="timer">
                    <div className="absolute-container">
                        <CommonComponents.SvgIcon iconName="timer-clock"
                                                  style={iconCounterStyle}/>
                        <div className="timer-counter"
                             style={timerCounterStyle}>
                            <div className="seconds tcenter">{this.state.remainTime}</div>
                            <div className="text">seconds</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    startTimer() {
        this.timerInterval = setInterval(()=> {
            console.warn('TIMEEEEEEER');
            if (this.state.remainTime > 0) {
                GameActionCreators.updateTimer(this.state.remainTime - 1);
            }

            if (this.state.remainTime == 0) {
                clearTimeout(this.timerInterval);
                this.props.onTimerStopped();
            }

            this.timerLineBorderWidth = `${Math.round(this.timerLine.offsetWidth - this.timerLine.offsetWidth * this.state.remainTime / this.props.timerDuration)}px`;
        }, 1000);
    }

    componentWillUnmount() {
        if (this.props.isHistory) {
            return;
        }
        JackpotStore.removeTimerListener(this._onChange);

        this.willUnmount = true;
        d3.select(this.timerLine).transition();
        clearTimeout(this.timerInterval);
    }
}

Timer.defaultProps = {
    timerDuration: 30
};

Timer.propTypes = {
    timerStarted: React.PropTypes.bool,
    time: React.PropTypes.number,
    onTimerStopped: React.PropTypes.func,
    isHistory: React.PropTypes.bool
};

