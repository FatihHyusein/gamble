import BaseComponent from '../../../base/BaseComponent';
import d3 from 'd3';

export default
class Timer extends BaseComponent {

    constructor() {
        super();

        this.startTimer = this.startTimer.bind(this);
        this.state = {
            // remainTime: this.props.time
        };
    }


    componentWillMount() {
        this.setState({
            remainTime: this.props.time
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timerStarted) {
            this.startTimer();
        }
    }

    componentDidMount() {
        if (this.props.timerStarted) {
            this.startTimer();
        }
    }

    render() {
        this.bgColor = d3.interpolateRgb('red', 'green')(this.state.remainTime * 3 / 100);

        var timeLineStyle = {
            backgroundColor: this.bgColor,
            borderWidth: this.state.timeLineWidth + 'px'
        };

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
            if (this.state.remainTime == 1) {
                clearTimeout(this.timerInterval);
                this.props.onTimerStopped();
            }

            if (this.state.remainTime < 10) {

            }
            this.setState({
                remainTime: --this.state.remainTime
            });
        }, 1000);

        d3.select(this.timerLine).transition().duration((this.props.time * 1000) - 1000)
            .tween('width', ()=> {
                    var i = d3.interpolate(0, this.timerLine.offsetWidth - 10);

                    return (t)=> {
                        if (!this.willUnmount) {
                            this.setState({
                                timeLineWidth: i(t)
                            });
                        }
                    };
                }
            );
    }

    componentWillUnmount() {
        this.willUnmount = true;
        d3.select(this.timerLine).transition();
        clearTimeout(this.timerInterval);
    }
}

Timer.propTypes = {
    timerStarted: React.PropTypes.bool,
    time: React.PropTypes.number,
    onTimerStopped: React.PropTypes.func
};

