import React, { Component } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTheme,
} from 'victory';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class MonthlyEnergyGraph extends Component {

    constructor(props) {
        super(props);

        // set state
        this.state = {
            transactions: [],
            graph_data: [],
            monthly_total: ''
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        transactionsService.getTransactionsTotal(self.props.token).then(function (graph_res) {
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

            transactionsService.getTransactionsTotalByMonth(thisMonth, self.props.token).then((total_res) => {
                transactionsService.getTransactions(self.props.token).then((result) => {
                    self.setState({ transactions: result.data, graph_data: formatted_graph_data, monthly_total: total_res.toFixed(2) })
                });
            });
        });
    }

    render() {
        return (
            <div>
                {/* <p className="page-subtitle">Monthly Financial Graph</p> */}
                
                {/* total transacted money */}
                {/* <div className="box total-transacted-box">
                    <p className="total-transacted-money">${this.state.monthly_total}</p>
                    <p className="total-transacted-description">Total transacted on USmart Energy this month</p>
                </div> */}

                <div className="chart-container">

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
                                fill: "#1c3144",
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
                                data: { fill: "#3F88C5" }
                            }}
                        />
                    </VictoryChart>
                </div>
            </div>
        )
    }
}

export default MonthlyEnergyGraph;