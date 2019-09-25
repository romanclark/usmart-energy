import React, { Component } from 'react';
import Switch from '../reuseable/Switch';
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import TransactionsService from "./TransactionsService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
const transactionsService = new TransactionsService();

class AllTransactionsFilter extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setGridSwitch = this.setGridSwitch.bind(this);
        this.setPurchasedSwitch = this.setPurchasedSwitch.bind(this);
        this.removeError = this.removeError.bind(this);

        // set state
        this.state = {
            transactions: [],
            isWithGrid: false,
            isPurchased: true,
            error: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var self = this;
        transactionsService.getFilteredTransactions(
            this.refs.startTime.value,
            this.refs.endTime.value,
            this.state.isWithGrid,
            this.state.isPurchased).then((result) => {
                self.setState({
                    transactions: result.data,
                    error: false
                });
            }).catch((error) => {
                self.setState({ error: true });
            });
    }

    setGridSwitch(newVal) {
        this.setState({
            isWithGrid: newVal
        })
    }

    setPurchasedSwitch(newVal) {
        this.setState({
            isPurchased: newVal
        })
    }

    removeError() {
        this.setState({
            error: false
        })
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Search All Transactions</p>
                <Row>
                    <Col lg="3.5">
                        <div>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <span className="left-margin form-inline filter-input">
                                    <div className="start-label">Start</div>
                                    <Form.Control type="datetime-local" ref='startTime' />
                                </span>
                                <span className="left-margin form-inline filter-input">
                                    <div className="end-label">End</div>
                                    <Form.Control type="datetime-local" ref='endTime' />
                                </span>
                                <span className="form-inline filter-input">
                                    <div className={this.state.isWithGrid ? "switch-text" : "switch-text filter-left-text"}>From local users<span>&nbsp;&nbsp;</span></div>
                                    <Switch
                                        id={"grid-switch"}
                                        isOn={this.state.isWithGrid}
                                        handleToggle={() => this.setGridSwitch(!this.state.isWithGrid)} />
                                    <div className={this.state.isWithGrid ? "switch-text filter-right-text" : "switch-text"}><span>&nbsp;</span>From power grid</div>
                                </span>
                                <span className="form-inline filter-input">
                                    <div className={this.state.isPurchased ? "switch-text" : "switch-text filter-left-text"}>Selling to system<span>&nbsp;</span></div>
                                    <Switch
                                        id={"purchased-switch"}
                                        isOn={this.state.isPurchased}
                                        handleToggle={() => this.setPurchasedSwitch(!this.state.isPurchased)} />
                                    <div className={this.state.isPurchased ? "switch-text filter-right-text" : "switch-text"}><span>&nbsp;</span>Purchasing from system</div>
                                </span>
                                <div className="form-inline filter-input">
                                    <Button variant="outline-secondary" type="submit">
                                        Filter <FaSearch />
                                    </Button>
                                    {this.state.error ? <div className="left-margin error2" onClick={this.removeError}>Error while filtering</div> : <div></div>}
                                    {this.state.transactions.length > 0 ? <div className="left-margin success2">Returned {this.state.transactions.length} results</div> : <div></div>}
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            {this.state.transactions.length > 0 ? (
                                <div className="scrollable-filter">
                                    <Table responsive striped borderless hover size="sm">
                                        <thead key="thead">
                                            <tr>
                                                <th>Asset</th>
                                                <th>Energy Sent</th>
                                                <th>Price/kWh</th>
                                                <th>Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.transactions.map(t =>
                                                <tr key={t.transaction_id}>
                                                    <td>{t.asset_id}</td>
                                                    <td>{t.energy_sent.toFixed(1)} kWh</td>
                                                    <td>{'$ ' + t.price_per_kwh}</td>
                                                    <td>{t.transaction_time.toString().replace('T', ' at ')}</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                    <div>
                                        <p className="info">Add a filter to see historical transaction data</p>
                                    </div>
                                )}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AllTransactionsFilter;