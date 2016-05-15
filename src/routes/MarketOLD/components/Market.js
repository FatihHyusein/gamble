import React, { Component } from 'react'
import { Link } from 'react-router'

class Market extends Component {
    render() {
        const events = [
            {id: 0, title: 'essay due'}
        ];


        return (
            <div>
                <h2>Market</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.title}</li>
                    ))}
                </ul>
                <Link to="/market/nested" >Market</Link>{' '}

                {this.props.children}
            </div>
        )
    }
}

module.exports = Market;
