import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { SECONDS_PER_MARKET_PERIOD } from '../../system_config';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsTableComponentScrollable extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getFreshTransactions = this.getFreshTransactions.bind(this);

        // set state
        this.state = {
            transactions: []
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        this.getFreshTransactions();
        this.timer = setInterval(() => this.getFreshTransactions(), SECONDS_PER_MARKET_PERIOD * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getFreshTransactions() {
        var self = this;
        transactionsService.getAllMostRecentTransactions(this.props.is_with_grid, this.props.token).then((result) => {
            self.setState({
                transactions: result.data
            })
        })
    }

    render() {
        let warning = this.props.with_grid ? 
            "No grid transactions for this market period yet" 
            : "No local transactions for this market period yet";
        return (
            <div>
                <p className="page-subtitle">{this.props.title} ({this.state.transactions.length} transactions)</p>
                {this.state.transactions.length > 0 ? (
                    <div className="scrollable-small">
                        <Table responsive striped borderless hover size="sm">
                            <thead key="thead">
                                <tr>
                                    {/* <th>ID #</th> */}
                                    <th>Asset</th>
                                    <th>Energy Sent</th>
                                    <th>Price/kWh</th>
                                    <th>Timestamp</th>
                                    <th>Purchase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions.map(t =>
                                    <tr key={t.transaction_id}>
                                        <td>{t.asset_id}</td>
                                        <td>{t.energy_sent.toFixed(1)} kWh</td>
                                        <td>{'$ ' + t.price_per_kwh}</td>
                                        <td>{t.transaction_time.toString().replace('T', ' at ')}</td>
                                        <td>{t.purchased.toString().charAt(0).toUpperCase() + t.purchased.toString().slice(1)}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                        <div>
                            <p className="warning">{warning}</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTableComponentScrollable;