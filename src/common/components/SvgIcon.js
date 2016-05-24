import {Component} from 'react';
import d3 from 'd3';

class SvgIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iconData: ''
        }
    }

    componentDidMount() {
        d3.xml(this.iconName, "image/svg+xml", (error, xml) => {
            // if (error) throw error;
            if (xml && xml.documentElement) {
                this.setState({iconData: xml.documentElement.outerHTML});
            }
        });
    }

    render() {
        this.iconName = 'staticFiles/icons/' + this.props.iconName + '.svg';
        function createMarkup(html) {
            return {__html: html};
        }

        return <div className="svg-icon" {...this.props}
                    dangerouslySetInnerHTML={createMarkup(this.state.iconData)}></div>;
    }
}

module.exports = SvgIcon;
