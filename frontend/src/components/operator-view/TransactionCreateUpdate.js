import React, { Component } from 'react';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.transaction_id) {
            transactionsService.getTransaction(params.transaction_id, this.getSnapshotBeforeUpdate.token).then((d) => {
                this.refs.nickname.value = d.nickname;
                this.refs.transaction_type.value = d.transaction_type;
                this.refs.charge_deadline.value = d.charge_deadline;
                this.refs.owner_id.value = d.owner_id;
            })
        }
    }

    handleCreate() {
        transactionsService.createTransaction(
            {
                "nickname": this.refs.nickname.value,
                "transaction_type": this.refs.transaction_type.value,
                "charge_deadline": this.refs.charge_deadline.value,
                "owner_id": this.refs.owner_id.value,
            }, this.props.token).then((result) => {
                alert("Transaction created!");
            }).catch(() => {
                alert('There was an error! Please re-check your form.');
            });
    }

    handleUpdate(transaction_id) {
        transactionsService.updateTransaction(
            {
                "transaction_id": transaction_id,
                "nickname": this.refs.nickname.value,
                "transaction_type": this.refs.transaction_type.value,
                "charge_deadline": this.refs.charge_deadline.value,
                "owner_id": this.refs.owner_id.value,
            }, this.props.token
        ).then((result) => {

            alert("Transaction updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.transaction_id) {
            this.handleUpdate(params.transaction_id);
        }
        else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Nickname:</label>
                    <input className="form-control" type="text" ref='nickname' />

                    <label>
                        Transaction Type:</label>
                    <input className="form-control" type="text" ref='transaction_type' />

                    <label>
                        Charge Deadline:</label>
                    <input className="form-control" type="text" ref='charge_deadline' />

                    <label>
                        Owner Id:</label>
                    <input className="form-control" type="text" ref='owner_id' />

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default TransactionCreateUpdate;