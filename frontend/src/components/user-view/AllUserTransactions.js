import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AllUserTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
       let row = this.props.transactions.length;
        return (
            <div>
                <p className="page-subtitle">All My Transactions</p>
                <div>
                    {this.props.transactions.length > 0 ? (
                        <div className="scrollable-small">
                            <Table responsive striped borderless hover size="sm">
                                <thead key="thead">
                                    <tr className="user-headers">
                                        <th></th>
                                        <th>Nickname</th>
                                        <th>Asset ID</th>
                                        <th>Energy Sent</th>
                                        <th>Price/kWh</th>
                                        <th>Timestamp</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.transactions.map(t =>
                                        <tr key={t.transaction_id}>
                                            <td>{row--}</td>
                                            <td>{t.asset_id.nickname}</td>
                                            <td>{t.asset_id.asset_id}</td>
                                            <td>{t.energy_sent.toFixed(1)} kWh</td>
                                            <td>{'$ ' + t.price_per_kwh}</td>
                                            <td>{t.transaction_time.toString().replace('T', ' at ').slice(0, t.transaction_time.toString().length)}</td>
                                            <td>{t.purchased ? 'Purchase' : 'Sale'}</td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                            <div>
                                <p className="error">You might not have any assets or just haven't been in the system long enough to see any transactions!</p>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

export default AllUserTransactions;
