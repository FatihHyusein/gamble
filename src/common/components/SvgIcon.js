import BaseComponent from '../../base/BaseComponent';
import React, {Component}from 'react';
import d3 from 'd3';
import SvgIconsActionCreators from '../../actions/SvgIconsActionCreators';
import SvgIconsStore from '../../stores/SvgIconsStore';


function getIconFromStore(name) {
    return {
        iconData: SvgIconsStore.getIcon(name)
    };
}
class SvgIcon extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = getIconFromStore(props.iconName);
        this.getIcon = this.getIcon.bind(this);
    }

    getIcon(iconName) {
        var cachedIcon = SvgIconsStore.getIcon(iconName);

        if (cachedIcon) {
            if (cachedIcon != this.state.iconData) {
                this.setState({iconData: cachedIcon});
            }
        }
        else {
            var iconUrl = 'staticFiles/icons/' + iconName + '.svg';

            d3.xml(iconUrl, "image/svg+xml", (error, xml) => {
                // if (error) throw error;
                if (xml && xml.documentElement) {
                    this.setState({iconData: xml.documentElement.outerHTML});

                    SvgIconsActionCreators.setNewIcon(iconName, xml.documentElement.outerHTML);
                }
            });
        }
    }

    componentDidMount() {
        this.getIcon(this.props.iconName);
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

        return <div className="svg-icon"
        >
            <i {...this.props}
                dangerouslySetInnerHTML={createMarkup(this.state.iconData)}>
            </i>
        </div>;
    }
}


SvgIcon.propTypes = {
    props: React.PropTypes.string
};

module.exports = SvgIcon;
