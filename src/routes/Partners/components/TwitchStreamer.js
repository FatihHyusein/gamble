import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router'

export default
class TwitchStreamer extends BaseComponent {
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
                <div className="header">
                    {pr.status}
                </div>
                <div className="stats">
                    <div>
                        <div className="numbers">{pr.views}</div>
                        <div className="info">total views</div>
                    </div>
                    <div>
                        <div className="numbers">{pr.followers}</div>
                        <div className="info">folowers</div>
                    </div>
                </div>

                <div className="user-info">
                    <div className="name">
                        {pr.display_name}
                    </div>
                    <div className="twitch-link">
                        {pr.url}
                    </div>
                </div>
            </a>
        )
    }
}


TwitchStreamer.propTypes = {
    streamerData: React.PropTypes.object
};
