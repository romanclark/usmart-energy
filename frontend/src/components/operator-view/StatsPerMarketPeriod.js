import React, { Component } from 'react';

class StatsPerMarketPeriod extends Component {

    constructor(props) {
        super(props);

        // set state
        this.state = {
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <p className="placeholder-text">Stats per market period will go here</p>
                <p className="page-subtitle">Stats for Most Recent Market Period</p>
            </div>
        )
    }
}

export default StatsPerMarketPeriod;