import JackpotGameStore from '../../../stores/games/JackpotGameStore';
import BaseComponent from '../../../base/BaseComponent';
import d3 from 'd3';

export default
class Chart extends BaseComponent {
    constructor() {
        super();

        this.state = {
            data: ''
        };

        this.update = this.update.bind(this);
        this.createChart = this.createChart.bind(this);
        this.easeInOutQuad = this.easeInOutQuad.bind(this);
        this.initChart = this.initChart.bind(this);
    }

    componentWillMount() {
        this.initChart({
            width: this.props.width,
            height: this.props.height
        });
    }

    initChart(dimensions) {
        var radius = Math.min(dimensions.width, dimensions.height) / 2;

        this.pie = d3.layout.pie()
            .sort(null)
            .value((d)=> d.value);

        this.arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6);

        this.key = (d)=> d.data.label;

        this.setState({'data': this.props.profilePercent || 0});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profilePercent != this.props.profilePercent) {
            this.updatedProps = true;
        }

        if (nextProps.width != this.props.width || nextProps.height != this.props.height) {
            this.initChart({
                width: nextProps.width,
                height: nextProps.height
            });
        }
    }


    easeInOutQuad(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        } else {
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    }

    update() {
        var profilePercent = this.props.profilePercent || 0;

        this.tickTime = 1;
        this.startProfilePercent = this.state.data;

        clearTimeout(this.updateTimeout);
        function timeout() {
            this.updateTimeout = setTimeout(()=> {
                this.tickTime = 10 + this.tickTime;
                this.setState
                ({data: parseFloat((this.easeInOutQuad(this.tickTime, this.startProfilePercent, profilePercent, 1000)).toFixed(4))});

                if (profilePercent != this.state.data) {
                    timeout.call(this);
                }
            }, 1);
        }

        timeout.call(this);
    }


    createChart() {
        var data = [
            {
                label: 'Profile',
                value: this.state.data
            },
            {
                label: 'All other',
                value: 1 - this.state.data
            }
        ];

        return (this.pie(data)).map((d, i)=> {
            var path;
            if (d.data.label == 'Profile') {
                path = <path fill={this.fillColor} d={this.arc(d)} key={i}/>
            }
            else {
                path = <path opacity="0.3" fill="#8a89a6" d={this.arc(d)} key={i}/>
            }

            return path;
        });
    }

    render() {
        this.fillColor = d3.interpolateRgb('#ff0000', '#2ca911')(this.state.data);
        var paths = this.createChart();
        var transformData = `translate(${this.props.width / 2},${this.props.height / 2})`;

        var minContainerSize = Math.min(this.props.width, this.props.height);
        var gunDimensions = {
            width: minContainerSize / 2,
            transformData: `translate(${-minContainerSize / 4},${-minContainerSize / 4})`
        };


        if (this.updatedProps) {
            this.updatedProps = false;
            this.update();
        }


        return (
            <div id="chart-container">
                <svg>
                    <g transform={transformData}>
                        <g className="slices">
                            {paths}
                        </g>
                        <g>
                            <foreignObject className="foreign-object" width={gunDimensions.width}
                                           transform={gunDimensions.transformData}>
                                <CommonComponents.SvgIcon
                                    iconName={JackpotGameStore.getPercentGunIcon({percent:this.state.data})}/>
                            </foreignObject>
                            <text fill={this.fillColor} className="percent-text" dy=".35em" text-anchor="middle">
                                {(this.state.data * 100).toFixed(2)}%
                            </text>
                            <text fill={this.fillColor} dy="2em" className="data" text-anchor="middle">CHANCE</text>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    }
}

Chart.propTypes = {
    profilePercent: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

