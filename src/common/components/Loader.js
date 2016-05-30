import BaseComponent from '../../base/BaseComponent';
import ToastMessagesStore from '../../stores/ToastMessagesStore';


function getState() {
    return {
        showLoader: ToastMessagesStore.getLoader()
    };
}

class Loader extends BaseComponent {
    constructor() {
        super();
        this.state = getState();
        this._onChange = this._onChange.bind(this);
    }


    render() {
        if (!this.state.showLoader) {
            return (<div></div>);
        }
        var longRequestsLoader = (this.state.showLoader > 1) ? 'long' : '';
        return (
            <div className={`loader ${longRequestsLoader}`}>
                <div id="img1" class="img">
                </div>
                <div id="img2" class="img"></div>
                <div id="img3" class="img"></div>
                <div id="img4" class="img"></div>
                <div id="img5" class="img"></div>
            </div>
        )
    }

    componentDidMount() {
        ToastMessagesStore.addChangeListener(this._onChange);
    }

    componentWillUnMount() {
        ToastMessagesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState());
    }
}


module.exports = Loader;
