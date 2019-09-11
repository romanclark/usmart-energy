import React, { Component } from 'react';
import { SECONDS_PER_MARKET_PERIOD } from '../../../src/system_config';

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
                <p>New market period every {SECONDS_PER_MARKET_PERIOD} seconds</p>
                {false ? (
                    <div>
                        <p>Here are all the stats for a market period</p>






                    </div>
                ) : (
                        <div>
                            <p className="warning">No stats for this market period to display</p>
                        </div>
                    )}
            </div>

        )
    }
}

export default StatsPerMarketPeriod;