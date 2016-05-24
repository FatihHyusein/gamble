import BaseComponent from '../../base/BaseComponent';
import React, {Component}from 'react';
import d3 from 'd3';

class SvgIcon extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            iconData: ''
        };

        this.getIcon = this.getIcon.bind(this);
    }

    componentDidMount() {
        this.getIcon(this.props.iconName);
    }

    getIcon(iconName) {
        var iconUrl = 'staticFiles/icons/' + iconName + '.svg';

        d3.xml(iconUrl, "image/svg+xml", (error, xml) => {
            // if (error) throw error;
            if (xml && xml.documentElement) {
                this.setState({iconData: xml.documentElement.outerHTML});
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.iconName && nextProps.iconName != this.props.iconName) {
            this.getIcon(nextProps.iconName);
        }
    }

    render() {
        function createMarkup(html) {
            return {__html: html};
        }

        return <div className="svg-icon" {...this.props}
                    dangerouslySetInnerHTML={createMarkup(this.state.iconData)}></div>;
    }
}


SvgIcon.propTypes = {
    props: React.PropTypes.string
};

module.exports = SvgIcon;
