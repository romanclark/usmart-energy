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

class MonthlyFinancialGraph extends Component {

    constructor(props) {
        super(props);

        // set state
        this.state = {
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        // const { match: { params } } = this.props;
        transactionsService.getDailyEnergyTotalForMonth(thisMonth, self.props.token).then((graph_res) => {
            // VictoryCharts need Date objects - dates are passed from backend in JSON string   
            var formatted_graph_data = [];
            for (var i = 0; i < graph_res.length; i++) {
                var datapt = graph_res[i];
                var parts = datapt.day.split('-');
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                var formatted_datapt = {
                    day: new Date(mydate),
                    total: datapt.total
                };
                formatted_graph_data.push(formatted_datapt);
            }
            self.setState({ energy_data: formatted_graph_data })
        });
    }

    render() {
        return (
            <div>
                {/* <p className="page-subtitle">Monthly Energy Graph</p> */}

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
                            text="Monthly USmart Energy Distributions"
                            x={225}
                            y={10}
                            style={{
                                fontSize: 10,
                                textAnchor: "middle",
                                fill: "#1c3144",
                            }}>
                        </VictoryLabel>

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
                            label="Energy Distributed (kWh)"
                            style={{
                                axisLabel: { fontSize: 8, padding: 30 },
                                tickLabels: { fontSize: 8, padding: 5 },
                                grid: { stroke: (s) => s > 200 ? "#3F88C5" : "grey" },
                                ticks: { stroke: (s) => s > 200 ? "#3F88C5" : "grey", size: 5 },
                            }}
                            dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        // tickFormat={(x) => (`${x}`)}
                        />
                        <VictoryBar
                            data={this.state.energy_data}
                            x="day"
                            y="total"
                            style={{
                                data: { fill: "#e49114" }
                            }}
                        />
                    </VictoryChart>
                </div>
            </div>
        )
    }
}

export default MonthlyFinancialGraph;