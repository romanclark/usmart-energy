import React, { Component } from 'react';
import TransactionsService from "./TransactionsService";
import OperatorView from "./OperatorView";
import {SECONDS_PER_MARKET_PERIOD} from "../../system_config";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
            this.refs.is_with_grid.checked, this.refs.purchased.checked, this.props.token).then((result) => {
               console.log("Got here")
                self.setState({
                transactions: result.data,
            })
        });

    }

    render() {
        return (
            <div>
                <p className="page-subtitle">View All Transactions</p>
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
                                Filter
                            </Button>

                    </Form>
                    </div>

                    {this.state.transactions.length > 0 ? (
                        <div>
                        <Table responsive striped bordered hover size="sm">
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
                        <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Previous</Button>
                        <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
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