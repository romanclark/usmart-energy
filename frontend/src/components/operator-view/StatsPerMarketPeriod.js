import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap/';
import { FaExclamationTriangle } from 'react-icons/fa';

import TransactionsService from '../operator-view/TransactionsService';
const transactionsService = new TransactionsService();

class StatsPerMarketPeriod extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.getMarketPeriodTransactions = this.getMarketPeriodTransactions.bind(this);

        // set state
        this.state = {
            stats: []
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        this.getMarketPeriodTransactions();
        //this.timer = setInterval(() => this.getMarketPeriodTransactions(), SECONDS_PER_MARKET_PERIOD * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getMarketPeriodTransactions() {
        let self = this;
        transactionsService.getMarketPeriodStats(this.props.token).then((data) => {
            self.setState({ stats: data });
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Stats for Newest Market Period</p>
                {this.props.stats.length > 0 ? (
                    <div className="monthly-stats-wrapper">
                        <CardDeck>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{Number(this.props.stats[0]).toFixed(1)} kwh </Card.Title>
                                    <Card.Text>
                                        Energy transacted locally
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{Number(this.props.stats[1]).toFixed(1)} kwh</Card.Title>
                                    <Card.Text>
                                        Energy purchased from grid
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{Number(this.props.stats[2]).toFixed(1)} kWh</Card.Title>
                                    <Card.Text>
                                        Energy sold to grid
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </div>
                ) : (
                        <div>
                            <p className="warning"><FaExclamationTriangle className="icon" size="3vmin"></FaExclamationTriangle> No stats for this market period</p>
                        </div>
                    )}
            </div>

        )
    }
}

export default StatsPerMarketPeriod;