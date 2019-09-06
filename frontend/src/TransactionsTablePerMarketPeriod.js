import React, { Component } from 'react';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

const secondsPerMarketPeriod = 2;


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
    // the endpoint to grab for just one market period
    // migration to add market period id/counter to transactions table
    // the endpoint to grab the market period id/counter
    // get that id and make it the marketPeriodNumber
    // display that market period's transactions in a table
    // what kind of table? bootstrap table or something?
    // styling with data in table
    // calculate market period timestamps from market period counter?
    // make seperate components for 
    // how to organize components on a page?
    // get jared's refactoring in or just do it myself with the transactions page
        // make table component
        // total transactions component
        // market period stats component
            // number display, date/time ranges display, current delta display

            
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
        transactionsService.getTransactions().then(function (result) { 
            var newMarketPeriodNumber = self.state.marketPeriodNumber + 1;
            self.setState({ transactions: result.data, marketPeriodNumber: newMarketPeriodNumber })
        })
    }

    render() {
        console.log(this.state.marketPeriodNumber);
        return (
            <div>
                <p>You're on market period: {this.state.marketPeriodNumber}</p>
            </div>
        )
    }



}

export default TransactionsTablePerMarketPeriod;