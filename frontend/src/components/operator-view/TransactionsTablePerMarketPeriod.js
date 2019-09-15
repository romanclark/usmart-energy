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
        transactionsService.getTransactionsForXMarketPeriods(1, this.props.token).then((result) => {
            var newMarketPeriodNumber = self.state.marketPeriodNumber + 1;
            self.setState({
                transactions: result.data,
                marketPeriodNumber: newMarketPeriodNumber
            })
        })
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Transactions for Most Recent Market Period</p>
                {this.state.transactions.length > 0 ? (
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
                        <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Previous</Button>
                        <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                    </div>
                ) : (
                        <div>
                            <p className="warning">No transactions for this market period</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTablePerMarketPeriod;