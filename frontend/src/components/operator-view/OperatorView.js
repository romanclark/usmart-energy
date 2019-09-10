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
                <p className="page-title">Operator View</p>
                <StatsPerMarketPeriod></StatsPerMarketPeriod>
                <TransactionsTablePerMarketPeriod></TransactionsTablePerMarketPeriod>
                <MonthlyEnergyGraph></MonthlyEnergyGraph>
                <MonthlyFinancialGraph></MonthlyFinancialGraph>
                <MapOfAllUsers></MapOfAllUsers>
                <ListOfAllUsers></ListOfAllUsers>
                <ListOfAllAssets></ListOfAllAssets>
            </div>
        );
    }
}
export default OperatorView;