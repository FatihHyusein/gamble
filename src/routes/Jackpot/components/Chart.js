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
    }

    componentWillMount() {
        var radius = Math.min(this.props.width, this.props.height) / 2;

        this.pie = d3.layout.pie()
            .sort(null)
            .value((d)=> d.value);

        this.arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6);

        this.key = (d)=> d.data.label;

        this.color = d3.scale.ordinal()
            .domain(["Profile", "All other"])
            .range(["yellow", "#8a89a6"]);

        this.setState({'data': this.props.profilePercent});
    }

    componentWillReceiveProps(nextProps) {
        this.updatedProps = true;
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
        this.tickTime = 1;
        this.startProfilePercent = this.state.data;

        function timeout() {
            setTimeout(()=> {
                this.tickTime = 10 + this.tickTime;
                this.setState
                ({data: parseFloat((this.easeInOutQuad(this.tickTime, this.startProfilePercent, this.props.profilePercent, 1000)).toFixed(4))});

                if (this.props.profilePercent != this.state.data) {
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
            return (
                <path fill={this.color(i)} d={this.arc(d)} key={i}/>
            )
        });
    }

    render() {
        var paths = this.createChart();
        var transformData = `translate(${this.props.width / 2},${this.props.height / 2})`;

        if (this.updatedProps) {
            this.updatedProps = false;
            this.update();
        }

        return (
            <div id="chart-container" onClick={this.update}>
                <h1>{this.props.profilePercent}</h1>
                <svg>
                    <g transform={transformData}>
                        <g class="slices">
                            {paths}
                        </g>
                        <g>
                            <image href="staticFiles/images/ak.png" height="50" width="100"></image>
                            <text class="percent-text" dy=".35em" text-anchor="middle">{this.state.data}</text>
                            <text dy="2em" class="data" text-anchor="middle">CHANCE</text>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }
}

Chart.defaultProps = {
    width: 960,
    height: 450
};
