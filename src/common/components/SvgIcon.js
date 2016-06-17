import BaseComponent from '../../base/BaseComponent';
import React, {Component}from 'react';
import d3 from 'd3';
import SvgIconsActionCreators from '../../actions/SvgIconsActionCreators';
import SvgIconsStore from '../../stores/SvgIconsStore';


function getIconFromStore(name) {
    var iconData = SvgIconsStore.getIcon(name);
    iconData = (typeof iconData === "string") ? iconData : '';

    return {
        iconData: iconData
    };
}
class SvgIcon extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = getIconFromStore(props.iconName);
        this.getIcon = this.getIcon.bind(this);
        this._onChange = this._onChange.bind(this);
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
            SvgIconsActionCreators.setIconNameForCache(iconName);

            d3.xml(iconUrl, "image/svg+xml", (error, xml) => {
                // if (error) throw error;
                if (xml && xml.documentElement) {
                    var xmlSerializer = new XMLSerializer();
                    var svgString = xmlSerializer.serializeToString(xml.documentElement);

                    this.setState({iconData: svgString});
                    SvgIconsActionCreators.setNewIcon(iconName, svgString);
                }
                else {
                    SvgIconsActionCreators.removeIconNameFromCache(iconName);
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.iconName && nextProps.iconName != this.props.iconName) {
            this.getIcon(nextProps.iconName);
        }
    }

    render() {
        if(!this.state.iconData){
            return (
                <i {...this.props}>

                </i>
            )
        }

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

    componentDidMount() {
        this.getIcon(this.props.iconName);
        SvgIconsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        SvgIconsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getIconFromStore(this.props.iconName));
    }

}


SvgIcon.propTypes = {
    props: React.PropTypes.string
};

module.exports = SvgIcon;
