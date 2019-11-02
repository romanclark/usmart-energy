import React, { Component } from 'react';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';

import TransactionsService from '../operator-view/TransactionsService';
const transactionsService = new TransactionsService();

class AllUserTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    refreshTransactions(e) {
        var self = this;
        transactionsService.getUserTransactions(this.props.user_id, this.props.token).then(function (result) {
            self.setState({ transactions: result.data })
        });
    }

    render() {
        let row = this.props.transactions.length;
        return (
            <div>
                <div>
                    <Row>
                        <Col>
                            <p className="page-subtitle">My Transaction History</p>
                        </Col>
                        <Col className="align-right">
                            <Button className="top-margin bottom-margin btn-outline-dark" onClick={(e) => this.refreshTransactions()}><FaSync className="icon" size="2.25vmin"></FaSync></Button>
                        </Col>
                    </Row>
                    {this.props.transactions.length > 0 ? (
                        <div className="scrollable-small">
                            <Table responsive striped borderless hover size="sm">
                                <thead key="thead">
                                    <tr className="user-headers">
                                        <th></th>
                                        <th>Type</th>
                                        <th>Class</th>
                                        <th>Nickname</th>
                                        <th>Asset ID</th>
                                        <th>Energy Sent</th>
                                        <th>Price/kWh</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.transactions.map(t =>
                                        <tr key={t.transaction_id}>
                                            <td>{row--}</td>
                                            <td>{t.purchased ? 'Purchase' : 'Sale'}</td>
                                            <td>{t.asset_id.asset_class}</td>
                                            <td>{t.asset_id.nickname}</td>
                                            <td>{t.asset_id.asset_id}</td>
                                            <td>{t.energy_sent.toFixed(1)} kWh</td>
                                            <td>{'$ ' + t.price_per_kwh}</td>
                                            <td>{t.transaction_time.toString().replace('T', ' at ').slice(0, t.transaction_time.toString().length)}</td>
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
