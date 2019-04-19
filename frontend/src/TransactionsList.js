import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryLabel, VictoryTheme } from 'victory';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class  TransactionsList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            transactions: [],
            graph_data: [],
            monthly_total: '',
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    // Run getTransactionsTotal and set the result (total_res) as "monthly_total" for render()
    // Then run getTransactionsTotalByMonth and set the result (graph_res) as "graph_data"
    // Then run getTransactions and set the result.data as "transactions"
    componentDidMount() {
        var  self  =  this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        transactionsService.getTransactionsTotal().then(function (graph_res) {
            // VictoryCharts need Date objects - dates are passed from backend in JSON string   
            var formatted_graph_data = [];
            for(var i = 0; i < graph_res.length; i++) {
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
            
            transactionsService.getTransactionsTotalByMonth(thisMonth).then(function (total_res) {
                transactionsService.getTransactions().then(function (result) {
                    self.setState({ transactions:  result.data, nextPageURL:  result.nextlink, graph_data: formatted_graph_data, monthly_total: total_res})
                });
            });
        });
    }


    handleDelete(e,transaction_id){
        var  self  =  this;
        transactionsService.deleteTransaction({transaction_id :  transaction_id}).then(()=>{
            var  newArr  =  self.state.transactions.filter(function(obj) {
                return  obj.transaction_id  !==  transaction_id;
            });
            self.setState({transactions:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        transactionsService.getTransactionsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ transactions:  result.data, nextPageURL:  result.nextlink})
        });
    }


    render() {

        return (
        <div  className="transactions--list">
        <br></br>
            <h3>Total transacted on app this month: ${this.state.monthly_total}</h3>
            <br></br>
            <VictoryChart
            domainPadding={20}
            scale={{ x: "time" }}
            style={{ parent: { maxWidth: "75%" } }}>
            <VictoryLabel text="Monthly U-Smart Energy Transactions" x={225} y={30} textAnchor="middle"/>
                <VictoryAxis


                    tickFormat={date => date.toLocaleString('en-us', { day:'numeric' })}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`$${x}`)}
                />
                <VictoryBar
                    data={this.state.graph_data}
                    x="day"
                    y="total"
                />
            </VictoryChart>
            <br></br>
            <table  className="table">
                <thead  key="thead">
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
                    {this.state.transactions.map( t  =>
                    <tr  key={t.transaction_id}>
                        <td>{t.transaction_id}  </td>
                        <td>{t.buyer_asset_id}  </td>
                        <td>{t.seller_asset_id}  </td>
                        <td>{t.energy_sent}</td>
                        <td>{t.price_per_kwh}</td>
                        <td>{t.transaction_time}</td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }
}
export  default  TransactionsList;