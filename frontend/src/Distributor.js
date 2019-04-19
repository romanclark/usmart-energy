import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryLabel, VictoryTheme } from 'victory';

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
            for(var i = 0; i < graph_res.length; i++) {
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
                <VictoryChart
                domainPadding={50}
                scale={{ x: "time" }}
                style={{ parent: { maxWidth: "50%" } }}>
                <VictoryLabel text="Monthly U-Smart Energy Distributions" x={225} y={30} textAnchor="middle"/>
                    <VictoryAxis
                        label = "Day"


                        tickFormat={date => date.toLocaleString('en-us', { day:'numeric' })}
                    />
                    <VictoryAxis
                        label = "Energy Distributed (kWh)"
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        //tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar
                        data={this.state.energy_data}
                        x="day"
                        y="total"
                    />
                </VictoryChart>
                <br></br>

                <a className="btn btn-primary" href={"/users/"}>View All Users</a>
                <a className="btn btn-primary" href={"/assets/"}>View All User Assets</a>
            </div>
        );
    }

}

export default Distributor;