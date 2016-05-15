import {Component} from 'react';

class SvgIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var iconName = 'staticFiles/icons/' + this.props.iconName + '.svg';

        return (
            <object {...this.props} data={iconName} className="svg-icon">
                <img src={iconName}/>
            </object>
        )
    }
}

module.exports = SvgIcon;
