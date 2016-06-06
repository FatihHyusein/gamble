import React, {Component} from 'react'
import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router';
import TwitchStreamer from './TwitchStreamer';
import Other from './Other';
import PartnersDataStore from '../../../stores/PartnersDataStore';
import PartnersActionsCreators from '../../../actions/PartnersActionsCreators';
import d3 from 'd3';

function getStateFromStores() {
    return {
        partners: PartnersDataStore.getPartners(),
        twitchPartners: PartnersDataStore.getTwitchPartners()
    };
}

class Partners extends BaseComponent {
    constructor() {
        super();
        this.state = getStateFromStores();

        this._onChange = this._onChange.bind(this);
        this.getPartnersFromBackend = this.getPartnersFromBackend.bind(this);
    }

    getPartnersFromBackend() {
        BaseComponent.getAjax({
            url: "partners",
            auth: false,
            params: {},
            successFunction: (data)=> {
                PartnersActionsCreators.updatePartnersList(
                    data
                );

                let partners = data.twitch;
                for (let partner of partners) {
                    d3.json(`https://api.twitch.tv/kraken/channels/${partner}`, (error, partners)=> {
                        PartnersActionsCreators.updateTwitchStreamers(
                            partners
                        );
                    });
                }
            }
        });

    }

    componentWillMount() {
        this.getPartnersFromBackend();
    }

    render() {
        let partners = this.state.partners;
        let twitchPartners = this.state.twitchPartners;

        let tws;
        if (twitchPartners && twitchPartners.length > 0) {
            tws = twitchPartners.map((tw, idx)=> {
                return (
                    <TwitchStreamer key={idx} streamerData={tw}/>
                );
            });
        }

        var twsHeader = (tws && tws.length > 0) ? <h1 className="tcenter">Twitch Streamers</h1> : '';

        let other;
        if (partners.others && partners.others.length > 0) {
            other = partners.others.map((tw, idx)=> {
                return (
                    <Other key={idx} streamerData={tw}/>
                );
            });
        }

        var othersHeader = (other && other.length > 0) ? <h1 className="tcenter">Other</h1> : '';

        return (
            <div id="partners-page">
                <div className="top-container">
                    <div className="header"><h1>Our partners</h1></div>
                </div>
                <div>
                    <div className="twitch">
                        {twsHeader}
                        <div className="twitch-partners-container">
                            {tws}
                        </div>
                    </div>

                    <div className="other">
                        {othersHeader}
                        <div className="twitch-partners-container">
                            {other}
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    componentDidMount() {
        PartnersDataStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PartnersDataStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }
}

module.exports = Partners;
