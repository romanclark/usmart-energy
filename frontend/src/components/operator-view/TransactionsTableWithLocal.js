import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { SECONDS_PER_MARKET_PERIOD } from '../../system_config';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsTableWithLocal extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getFreshTransactions = this.getFreshTransactions.bind(this);

        // set state
        this.state = {
            transactions: [],
            nextPageURL: '',
            prevPageURL: '',
            numPages: 0
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
        transactionsService.getMostRecentTransactions(0, this.props.token).then((result) => {
            self.setState({
                transactions: result.data,
                nextPageURL: result.nextlink,
                prevPageURL: result.prevlink,
                numPages: result.numpages
            })
        })
    }

    nextPage() {
        var self = this;
        transactionsService.getTransactionsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ users: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink, numPages: result.numpages })
        });
    }

    prevPage() {
        var self = this;
        if (self.state.prevPageURL === '') {
            // do nothing
            return
        }
        transactionsService.getTransactionsByURL(this.state.prevPageURL).then((result) => {
            self.setState({ users: result.data, prevPageURL: result.prevLink, nextPageURL: result.nextlink, numPages: result.numpages })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Local Transactions for Most Recent Market Period</p>
                {this.state.transactions.length > 0 ? (
                    <div>
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
                        {this.state.numPages > 1 ? (
                            <div>
                                <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Prev</Button>
                                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>

                            </div>
                        ) : (
                                <div></div>
                            )}
                    </div>
                ) : (
                        <div>
                            <p className="warning">No local transactions for this market period yet</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTableWithLocal;