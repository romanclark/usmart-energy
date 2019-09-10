import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { SECONDS_PER_MARKET_PERIOD } from '../../../src/system_config';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsTablePerMarketPeriod extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getFreshTransactions = this.getFreshTransactions.bind(this);

        // set state
        this.state = {
            transactions: [],
            marketPeriodNumber: null
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
        transactionsService.getTransactionsForXMarketPeriods(1).then(function (result) {
            var newMarketPeriodNumber = self.state.marketPeriodNumber + 1;
            self.setState({
                transactions: result.data,
                marketPeriodNumber: newMarketPeriodNumber
            })
            console.log(self.state);
        })
    }

    render() {
        console.log(this.state.marketPeriodNumber);
        return (
            <div>
                <p className="placeholder-text">You're on market period: {this.state.marketPeriodNumber}</p>
                <p className="page-subtitle">Transcations for Most Recent Market Period</p>
                <div>
                    <Table responsive striped bordered hover size="sm">
                        <thead key="thead">
                            <tr>
                                {/* <th>ID #</th> */}
                                <th>Buying Asset</th>
                                <th>Selling Asset</th>
                                <th>Energy Sent (kWh)</th>
                                <th>Price/kWh</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map(t =>
                                <tr key={t.transaction_id}>
                                    {/* <td>{t.transaction_id}</td> */}
                                    <td>{t.buyer_asset_id}</td>
                                    <td>{t.seller_asset_id}</td>
                                    <td>{t.energy_sent}</td>
                                    <td>{t.price_per_kwh}</td>
                                    <td>{t.transaction_time}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
                {this.state.transactions.length > 0 ? (
                    <div>
                        <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Previous</Button>
                        <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                    </div>
                ) : (
                        <div>
                            <p className="warning">No transactions for this market period to display</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTablePerMarketPeriod;