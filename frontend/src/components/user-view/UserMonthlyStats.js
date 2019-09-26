import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap/';

import TransactionsService from '../operator-view/TransactionsService';
const transactionsService = new TransactionsService();

class UserMontlyStats extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.getMonthlyTransactions = this.getMonthlyTransactions.bind(this);

        // set state
        this.state = {
            user_stats: []
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        // var self = this;
        // self.getMonthlyTransactions(this.props.user_id);
    }

    componentWillReceiveProps() {
        if (this.props.user_id !== null) {
            this.getMonthlyTransactions(this.props.user_id, this.props.token);
        }
    }

    getMonthlyTransactions(user_id, token) {
        var self = this;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        transactionsService.getMonthlyTransactionsByUser(user_id, thisMonth, token).then((user_data) => {
            self.setState({ user_stats: user_data });
        });
    }

    render() {
        return (
            <div className="monthly-stats-wrapper">
                <p className="page-subtitle">My Monthly Stats from using USmart Energy</p>
                <div>
                    <CardDeck>
                        <Card>
                            <Card.Body>
                                <Card.Title>${Number(this.state.user_stats[0]).toFixed(2)}</Card.Title>
                                <Card.Text>
                                    Spending total
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>${Number(this.state.user_stats[2]).toFixed(2)}</Card.Title>
                                <Card.Text>
                                    Selling total
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>{Number(this.state.user_stats[1]).toFixed(2)} kWh</Card.Title>
                                <Card.Text>
                                    Energy purchased
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>{Number(this.state.user_stats[3]).toFixed(2)} kWh</Card.Title>
                                <Card.Text>
                                    Energy sold
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </div>
        )
    }
}

export default UserMontlyStats;