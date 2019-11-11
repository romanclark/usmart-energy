import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTheme,
    VictoryLine,
    VictoryLegend
} from 'victory';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class DailyEnergyGraph extends Component {

    constructor(props) {
        super(props);

        // set state
        this.state = {
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        this.getEnergyInfo();
        //this.props.refresh(this.getEnergyInfo);
        //this.timer = setInterval(() => this.getEnergyInfo(), SECONDS_PER_MARKET_PERIOD * 500);
    }

    getEnergyInfo(){
        var self = this;
        transactionsService.getEnergyDemandForPriorDay(self.props.token).then((demand_res) => {
            transactionsService.getEnergySupplyForPriorDay(self.props.token).then((supply_res) => {
                self.setState({ energy_demand: demand_res, energy_supply: supply_res})
            })
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
                        domainPadding={15}
                        domain={{x: [0,24]}}
                        //scale={{ x: "time" }}
                        theme={VictoryTheme.grayscale}>

                        {/* title */}
                        <VictoryLabel
                            text="Daily USmart Energy Demand and Supply"
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
                            label="Hour"
                            style={{
                                axisLabel: { fontSize: 8, padding: 15 },
                                tickLabels: { fontSize: 6, padding: 0 }
                            }}
                            tickFormat={date => date.toLocaleString('en-us', { time: 'numeric' })}
                        />

                        {/* y axis */}
                        <VictoryAxis
                            label="Energy (kWh)"
                            style={{
                                axisLabel: { fontSize: 8, padding: 30 },
                                tickLabels: { fontSize: 8, padding: 5 },
                                grid: { stroke: (s) => s > 200 ? "#3F88C5" : "grey" },
                                ticks: { stroke: (s) => s > 200 ? "#3F88C5" : "grey", size: 5 },
                            }}
                            dependentAxis
                        />
                        <VictoryLegend x={170} y={20}
                            orientation="horizontal"
                            gutter={20}
                            style={{ title: {fontSize: 8 }, height: 20, labels: {fontSize: 6}}}
                            data={[
                            { name: "Local Demand", symbol: { fill: "#e49114", type: "minus" } },
                            { name: "Local Supply", symbol: { fill: "#3F88C5", type: "minus" } }
                            ]}
                        />
                        <VictoryLine
                            data={this.props.demand}
                            x="hour"
                            y="total"
                            style={{
                                data: { stroke: "#e49114", opacity: 0.7, strokeWidth: 1 }
                                
                            }}
                        />
                        <VictoryLine
                            data={this.props.supply}
                            x="hour"
                            y="total"
                            style={{
                                data: { stroke: "#3F88C5", opacity: 0.7, strokeWidth: 1 }
                                
                            }}
                        />
                        
                    </VictoryChart>
                </div>
            </div>
        )
    }
}

export default DailyEnergyGraph;