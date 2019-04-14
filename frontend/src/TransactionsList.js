import React, { Component } from 'react';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class  TransactionsList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            transactions: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }


    componentDidMount() {
        var  self  =  this;
        transactionsService.getTransactions().then(function (result) {
            self.setState({ transactions:  result.data, nextPageURL:  result.nextlink})
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
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>ID #</th>
                    <th>Buying Asset</th>
                    <th>Selling Asset</th>
                    <th>Energy Sent</th>
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