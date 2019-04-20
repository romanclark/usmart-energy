import React, { Component } from 'react';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryLabel, VictoryTheme
} from 'victory';

import Button from 'react-bootstrap/Button';

import { FaUserFriends, FaBolt } from 'react-icons/fa';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class Distributor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            energy_data: [],
            nextPageURL: ''
        };
    }

    componentDidMount() {
        var self = this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        const { match: { params } } = this.props;
        transactionsService.getDailyEnergyTotalForMonth(thisMonth).then(function (graph_res) {
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
            <div className="distributor">
            <p className="page-title">System Distributor Overview</p>
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
                            text="Monthly USmart Energy Distributions"
                            x={225}
                            y={10}
                            style={{
                                fontSize: 10,
                                textAnchor: "middle",
                                fill: "#5a7587",
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
                                grid: { stroke: (s) => s > 20 ? "#cc0000" : "grey" },
                                ticks: { stroke: (s) => s > 20 ? "#cc0000" : "grey", size: 5 },
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
                                data: { fill: "#5a7587" }
                            }}
                        />
                    </VictoryChart>
                </div>

                <Button variant="outline-secondary" href={"/users/"}>View All Users <FaUserFriends /></Button>
                <Button variant="outline-secondary" href={"/assets/"}>View All User Assets <FaBolt /></Button>
            </div>
        );
    }

}

export default Distributor;