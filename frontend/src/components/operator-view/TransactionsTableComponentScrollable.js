import React, { Component } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class TransactionsTableComponentScrollable extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getFreshTransactions = this.getFreshTransactions.bind(this);

        // set state
        this.state = {
            //newData: false
        }
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        //this.getFreshTransactions();
        //this.props.refresh(this.getFreshTransactions);
        //this.timer = setInterval(() => this.getFreshTransactions(), SECONDS_PER_MARKET_PERIOD * 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getFreshTransactions() {
        var self = this;
        transactionsService.getAllMostRecentTransactions(this.props.is_with_grid, this.props.token).then((result) => {
            self.setState({
                transactions: result.data,
                newData: JSON.stringify(result.data) !== JSON.stringify(self.state.transactions) ? true : false
            })
        })
    }

    render() {
        let row = 1;
        let warning = this.props.is_with_grid ?
            "Grid transactions weren't necessary for this market period"
            : "No local transactions during latest market period";
        return (
            <div>
                <Row>
                    <Col>
                        <p className="page-subtitle">{this.props.title} ({this.props.transactions.length})</p>
                    </Col>
                </Row>
                {this.props.transactions.length > 0 ? (
                    <div className="scrollable-small">
                        <Table responsive striped borderless hover size="sm">
                            <thead key="thead">
                                <tr className="operator-table-headers">
                                    <th></th>
                                    <th>Type</th>
                                    <th>Class</th>
                                    <th>Asset</th>
                                    <th>Asset Owner</th>
                                    <th>Energy Sent</th>
                                    <th>Price/kWh</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.transactions.map(t =>
                                    <tr key={t.transaction_id} className={this.props.newData ? "new-data" : ""}>
                                        <td>{row++}</td>
                                        <td>{t.purchased ? 'Purchase' : 'Sale'}</td>
                                        <td>{t.asset_id.asset_class}</td>
                                        <td>{t.asset_id.nickname}</td>
                                        <td>{t.asset_id.owner.first_name}  {t.asset_id.owner.last_name}</td>
                                        <td>{t.energy_sent.toFixed(1)} kWh</td>
                                        <td>{'$ ' + t.price_per_kwh}</td>
                                        <td>{t.transaction_time.toString().replace('T', ' at ').slice(0, t.transaction_time.toString().length)}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                        <div>
                            <p className="warning"><FaExclamationTriangle className="icon" size="3vmin"></FaExclamationTriangle> {warning}</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTableComponentScrollable;
