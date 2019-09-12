import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTablePerMarketPeriod from './TransactionsTablePerMarketPeriod';
import MonthlyEnergyGraph from './MonthlyFinancialGraph';
import MonthlyFinancialGraph from './MonthlyEnergyGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsers from './ListOfAllUsers';
import ListOfAllAssets from './ListOfAllAssets';

class OperatorView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // var self = this;
    }

    render() {
        return (
            <div className="operator--view container">
                <p className="page-title">Operator View</p>

                <Container className="container">
                    <Row>
                        <Col className="wrapper">
                            <StatsPerMarketPeriod></StatsPerMarketPeriod>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <TransactionsTablePerMarketPeriod></TransactionsTablePerMarketPeriod>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <MapOfAllUsers></MapOfAllUsers>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            
                        </Col>
                        <Col className="wrapper" lg="8">
                            <MonthlyEnergyGraph></MonthlyEnergyGraph>
                            <MonthlyFinancialGraph></MonthlyFinancialGraph>
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <ListOfAllUsers></ListOfAllUsers>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <ListOfAllAssets></ListOfAllAssets>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default OperatorView;