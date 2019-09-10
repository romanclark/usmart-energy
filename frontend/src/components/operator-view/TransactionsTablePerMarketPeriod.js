import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

const secondsPerMarketPeriod = 60;

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

    // TODO below
    // styling with data in table
    // calculate market period timestamps from market period counter?
    // how to organize components on a page?
            
    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        this.getFreshTransactions(); // maybe not call this? it calls it again when the victory table reloads?
        this.timer = setInterval(() => this.getFreshTransactions(), secondsPerMarketPeriod * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getFreshTransactions() {
        var self = this;
        transactionsService.getTransactionsForXMarketPeriods(1).then(function (result) { 
            var newMarketPeriodNumber = self.state.marketPeriodNumber + 1;
            self.setState({ transactions: result.data, marketPeriodNumber: newMarketPeriodNumber })
        })
    }

    render() {
        console.log(this.state.marketPeriodNumber);
        return (
            <div>
                <p className="placeholder-text">You're on market period: {this.state.marketPeriodNumber}</p>
                <p className="page-subtitle">Transcations for Most Recent Market Period</p>
                {/* TODO make this smaller? */}
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
        )
    }
}

export default TransactionsTablePerMarketPeriod;