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
        var self = this;
    }

    render() {
        return (
            <div className="operator--view">
                <div className="component-wrapper">
                    <p className="page-title">Operator View</p>
                </div>
                <div className="component-wrapper">
                    <StatsPerMarketPeriod></StatsPerMarketPeriod>
                </div>
                <div className="component-wrapper">
                    <TransactionsTablePerMarketPeriod></TransactionsTablePerMarketPeriod>
                </div>
                <div className="component-wrapper">
                    <MonthlyEnergyGraph></MonthlyEnergyGraph>
                </div>
                <div className="component-wrapper">
                    <MonthlyFinancialGraph></MonthlyFinancialGraph>
                </div>
                <div className="component-wrapper">
                    <MapOfAllUsers></MapOfAllUsers>
                </div>
                <div className="component-wrapper">
                    <ListOfAllUsers></ListOfAllUsers>
                </div>
                <div className="component-wrapper">
                    <ListOfAllAssets></ListOfAllAssets>
                </div>
            </div>
        );
    }
}
export default OperatorView;