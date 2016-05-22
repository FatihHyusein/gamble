import BaseComponent from '../../../base/BaseComponent';
import d3 from 'd3';

export default
class Chart extends BaseComponent {

    constructor() {
        super();
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.svg = d3.select("chart-container")
            .append("svg")
            .append("g");

        this.svg.append("g")
            .attr("class", "slices");

        var width = 960,
            height = 450,
            radius = Math.min(width, height) / 2;

        this.svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var svgText = this.svg.append('g');

        svgText.append('image')
            .attr('height', 50)
            .attr('width', 100)
            .style('transform', "translate(-50%, -100%)");

        svgText.append("text")
            .attr("class", "percent-text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle");

        svgText.append("text")
            .attr("dy", "2em")
            .style("text-anchor", "middle")
            .attr("class", "data")
            .text(function (d) {
                return 'CHANCE';
            });
    }

    render() {
        this.change([{
            label: 'Profile',
            value: 0.6
        }, {
            label: 'AllOther',
            value: 0.4
        }]);

        return (
            <div id="chart-container">

            </div>
        )
    }

    change(data) {
        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });

        var arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6);

        var key = function (d) {
            return d.data.label;
        };

        var color = d3.scale.ordinal()
            .domain(["Profile", "All other"])
            .range(["#98abc5", "#8a89a6"]);

        /* ------- PIE SLICES -------*/
        var slice = this.svg.select(".slices").selectAll("path.slice")
            .data(pie(data), key);

        slice.enter()
            .insert("path")
            .style("fill", function (d) {
                return color(d.data.label);
            })
            .attr("class", "slice");

        slice
            .transition().duration(1000)
            .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        slice.exit()
            .remove();

        var profilePercent = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].label == 'Profile') {
                profilePercent = Math.round(data[i].value * 100);
                break;
            }
        }

        this.svg.select(".percent-text").text(profilePercent + '%');
        this.svg.select("image").attr('href', 'staticFiles/images/ak.png');
    }
}
