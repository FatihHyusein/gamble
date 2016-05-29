import BaseComponent from '../../../base/BaseComponent';
import {Link} from 'react-router';
import ContactForm from '../routes/Contact/component/Contact';

class Support extends BaseComponent {
    render() {
        var tabs = this.props.tabs.map((tab, idx)=> {
            return ( <Link to={`/support${tab.route}`} activeClassName="active" key={tab.route}
                           className={`${(idx==0 && !this.props.children)?'active':''}`}>
                <CommonComponents.SvgIcon iconName={tab.icon}/>
                <div>
                    {tab.name}
                </div>
            </Link>);
        });

        return (
            <div id="support">
                <div className="top-container">
                    <div className="header">
                        <h1>SUPPORT</h1>
                    </div>
                </div>
                <div className="items-container">
                    <div className="tab-control">
                        {tabs}
                    </div>
                    <div className="tab-continer">
                        {this.props.children || <ContactForm/>}
                    </div>
                </div>
            </div>
        )
    }
}

Support.defaultProps = {
    tabs: [
        {
            name: "CONTACT",
            route: '/contact',
            icon: 'contacts'
        },
        {
            name: "F.A.Q.",
            route: '/faq',
            icon: 'faq'
        },
        {
            name: "TERMS OF SERVICE",
            route: '/terms',
            icon: 'tos'
        }
    ]
};

module.exports = Support;


