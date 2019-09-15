import React, { Component } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTheme,
} from 'victory';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AuthConsumer } from '../auth/authContext';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import TransactionsTablePerMarketPeriod from './TransactionsTablePerMarketPeriod';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            graph_data: [],
            monthly_total: '',
            nextPageURL: '',
            prevPageURL: ''
        };
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // Run getTransactionsTotal and set the result (total_res) as "monthly_total" for render()
    // Then run getTransactionsTotalByMonth and set the result (graph_res) as "graph_data"
    // Then run getTransactions and set the result.data as "transactions"
    componentDidMount() {
        var self = this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        transactionsService.getTransactionsTotal(self.props.token).then(graph_res => {
            // VictoryCharts need Date objects - dates are passed from backend in JSON string   
            var formatted_graph_data = [];
            for (var i = 0; i < graph_res.length; i++) {
                var datapt = graph_res[i];
                var parts = datapt.day.split('-');
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
                var formatted_datapt = {
                    day: new Date(mydate),
                    total: datapt.total
                };
                formatted_graph_data.push(formatted_datapt);

            }

            transactionsService.getTransactionsTotalByMonth(thisMonth, self.props.token).then(total_res => {
                transactionsService.getTransactions(self.props.token).then(result => {
                    self.setState({ transactions: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink, graph_data: formatted_graph_data, monthly_total: total_res.toFixed(2) })
                });
            });
        });
    }


    handleDelete(e, transaction_id) {
        var self = this;
        transactionsService.deleteTransaction({ transaction_id: transaction_id }, self.props.token).then(() => {
            var newArr = self.state.transactions.filter(function (obj) {
                return obj.transaction_id !== transaction_id;
            });
            self.setState({ transactions: newArr })
        });
    }

    nextPage() {
        var self = this;
        transactionsService.getTransactionsByURL(this.state.nextPageURL, self.props.token).then((result) => {
            self.setState({ transactions: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink })
        });
    }

    prevPage() {
        var self = this;
        transactionsService.getTransactionsByURL(this.state.prevPageURL, self.props.token).then((result) => {
            self.setState({ transactions: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink })
        });
    }

    render() {
        return (
            <AuthConsumer>
                {({ accessToken }) => (
                    <div className="transactions--view">
                        <TransactionsTablePerMarketPeriod token={accessToken}></TransactionsTablePerMarketPeriod>
                        <p className="page-title">All Transactions in System</p>

                        {/* total transacted money */}
                        <div className="box total-transacted-box">
                            <p className="total-transacted-money">${this.state.monthly_total}</p>
                            <p className="total-transacted-description">Total transacted on USmart Energy this month</p>
                        </div>

                        <div className="box chart-container">

                            {/* the chart */}
                            <VictoryChart
                                padding={{ top: 30, right: 15, left: 45, bottom: 30 }}
                                height={150}
                                domainPadding={10}
                                scale={{ x: "time" }}
                                theme={VictoryTheme.grayscale}>

                                {/* title */}
                                <VictoryLabel
                                    text="Monthly USmart Energy Transactions"
                                    x={225}
                                    y={10}
                                    style={{
                                        fontSize: 10,
                                        textAnchor: "middle",
                                        fill: "#5a7587",
                                    }}
                                />

                                {/* x axis */}
                                <VictoryAxis
                                    label="Day"
                                    style={{
                                        axisLabel: { fontSize: 8, padding: 15 },
                                        tickLabels: { fontSize: 8, padding: 5 }
                                    }}
                                    tickFormat={date => date.toLocaleString('en-us', { day: 'numeric' })}
                                />

                                {/* y axis */}
                                <VictoryAxis
                                    label="Daily Transaction Total"
                                    style={{
                                        axisLabel: { fontSize: 8, padding: 30 },
                                        tickLabels: { fontSize: 8, padding: 5 },
                                        grid: { stroke: (s) => s > 20 ? "#cc0000" : "grey" },
                                        ticks: { stroke: (s) => s > 20 ? "#cc0000" : "grey", size: 5 },
                                    }}
                                    dependentAxis
                                    // tickFormat specifies how ticks should be displayed
                                    tickFormat={(x) => (`$${x}`)}
                                />
                                <VictoryBar
                                    data={this.state.graph_data}
                                    x="day"
                                    y="total"
                                    style={{
                                        data: { fill: "#5a7587" }
                                    }}
                                />
                            </VictoryChart>
                        </div>

                        <Table responsive striped bordered hover size="sm">
                            <thead key="thead">
                                <tr>
                                    <th>ID #</th>
                                    <th>Buying Asset</th>
                                    <th>Selling Asset</th>
                                    <th>Energy Sent (kWh)</th>
                                    <th>Price Per kWh</th>
                                    <th>Transaction Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions.map(t =>
                                    <tr key={t.transaction_id}>
                                        <td>{t.transaction_id}  </td>
                                        <td>{t.buyer_asset_id}  </td>
                                        <td>{t.seller_asset_id}  </td>
                                        <td>{t.energy_sent}</td>
                                        <td>{t.price_per_kwh}</td>
                                        <td>{t.transaction_time}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Previous</Button>
                        <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default TransactionsList;