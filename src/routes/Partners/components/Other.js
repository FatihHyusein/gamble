import BaseComponent from '../../../base/BaseComponent';

export default
class Other extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        const pr = this.props.streamerData;

        var bgImage = {
            backgroundImage: `url(${pr.logo})`
        };

        return (
            <a href={pr.url} target="blank" className="twitch-streamer" style={bgImage}>
                <div className="user-info">
                    <div className="name">
                        {pr.name}
                    </div>
                    <div className="twitch-link">
                        {pr.url}
                    </div>
                </div>
            </a>
        )
    }
}


Other.propTypes = {
    streamerData: React.PropTypes.object
};
