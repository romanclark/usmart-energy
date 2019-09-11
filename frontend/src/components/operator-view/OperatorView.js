import React, { Component } from 'react';

import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTablePerMarketPeriod from './TransactionsTablePerMarketPeriod';
import MonthlyEnergyGraph from './MonthlyEnergyGraph';
import MonthlyFinancialGraph from './MonthlyFinancialGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsers from './ListOfAllUsers';
import ListOfAllAssets from './ListOfAllAssets';

class OperatorView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        // var self = this;
    }

    render() {
        return (
            <div className="operator--view">
                <div className="wrapper">
                    <p className="page-title">Operator View</p>
                </div>
                <div className="wrapper">
                    <StatsPerMarketPeriod></StatsPerMarketPeriod>
                </div>
                <div className="wrapper">
                    <TransactionsTablePerMarketPeriod></TransactionsTablePerMarketPeriod>
                </div>
                <div className="wrapper">
                    <MonthlyEnergyGraph></MonthlyEnergyGraph>
                </div>
                <div className="wrapper">
                    <MonthlyFinancialGraph></MonthlyFinancialGraph>
                </div>
                <div className="wrapper">
                    <MapOfAllUsers></MapOfAllUsers>
                </div>
                <div className="wrapper">
                    <ListOfAllUsers></ListOfAllUsers>
                </div>
                <div className="wrapper">
                    <ListOfAllAssets></ListOfAllAssets>
                </div>
            </div>
        );
    }
}
export default OperatorView;