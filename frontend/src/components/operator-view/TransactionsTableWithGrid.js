import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { SECONDS_PER_MARKET_PERIOD } from '../../../src/system_config';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsTableWithGrid extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getFreshTransactions = this.getFreshTransactions.bind(this);

        // set state
        this.state = {
            transactions: [],
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
        transactionsService.getMostRecentTransactions(1).then((result) => {
            self.setState({
                transactions: result.data,
            })
        })
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Grid Transactions for Most Recent Market Period</p>
                {this.state.transactions.length > 0 ? (
                    <div>
                        <Table responsive striped bordered hover size="sm">
                            <thead key="thead">
                                <tr>
                                    {/* <th>ID #</th> */}
                                    <th>Asset</th>
                                    <th>Energy Sent (kWh)</th>
                                    <th>Price/kWh</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions.map(t =>
                                    <tr key={t.transaction_id}>
                                        <td>{t.asset_id}</td>
                                        <td>{t.energy_sent.toFixed(2)}</td>
                                        <td>{t.price_per_kwh}</td>
                                        <td>{t.transaction_time}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        {/*<Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Previous</Button>*/}
                        {/*<Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>*/}
                    </div>
                ) : (
                        <div>
                            <p className="warning">No grid transactions for this market period</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTableWithGrid;