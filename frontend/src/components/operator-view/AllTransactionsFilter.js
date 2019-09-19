import React, { Component } from 'react';
import { Table, Button, Form, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

import TransactionsService from "./TransactionsService";
const transactionsService = new TransactionsService();

class AllTransactionsFilter extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // set state
        this.state = {
            transactions: [],
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        var self = this;
        transactionsService.getFilteredTransactions(this.refs.startTime.value, this.refs.endTime.value,
            this.refs.is_with_grid.checked, this.refs.purchased.checked).then((result) => {
                self.setState({
                    transactions: result.data
                })
            });

    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Search All Transactions</p>
                <div>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="datetime-local" placeholder="StartTime" ref='startTime' />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="datetime-local" placeholder="EndTime" ref='endTime' />
                            </Form.Group>
                            <span className="d-lg-inline">
                                <Form.Check type="checkbox" label="With Grid" name='is_with_grid' id="is_with_grid" ref='is_with_grid' value='0' />
                                <Form.Check type="checkbox" label="Purchased?" name='Purchased?' id="purchased" ref='purchased' value='0' />
                            </span>
                        </Form.Row>
                        <Button variant="outline-secondary" type="submit">
                            Filter <FaSearch />
                        </Button>

                    </Form>
                </div>

                {this.state.transactions.length > 0 ? (
                    <div>
                        <Table responsive striped borderless hover size="sm">
                            <thead key="thead">
                                <tr>
                                    {/* <th>ID #</th> */}
                                    <th>Asset</th>
                                    <th>Energy Sent (kWh)</th>
                                    <th>Price/kWh</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions.map(t =>
                                    <tr key={t.transaction_id}>
                                        <td>{t.asset_id}</td>
                                        <td>{t.energy_sent.toFixed(2)}</td>
                                        <td>{t.price_per_kwh}</td>
                                        <td>{t.transaction_time}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        {this.state.numPages > 1 ? (
                            <div>
                                <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Prev</Button>
                                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>

                            </div>
                        ) : (
                                <div></div>
                            )}
                    </div>
                ) : (
                        <div>
                            <p className="warning">No transactions for selected market period</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default AllTransactionsFilter;