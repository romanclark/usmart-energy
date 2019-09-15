import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTablePerMarketPeriod from './TransactionsTablePerMarketPeriod';
import MonthlyEnergyGraph from './MonthlyFinancialGraph';
import MonthlyFinancialGraph from './MonthlyEnergyGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsers from './ListOfAllUsers';
import ListOfAllAssets from './ListOfAllAssets';
import { AuthConsumer } from '../auth/authContext';

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
            <AuthConsumer>
                {({ accessToken }) => (
                    <div className="operator--view container">
                        <p className="page-title">Operator View
                {/* <OverlayTrigger placement='top' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">As a system operator, you can see all transaction, user, and market information here</Tooltip>}>
                        <span className="d-inline-block">
                            <Button style={{ pointerEvents: 'none' }} size="sm">?</Button>
                        </span>
                    </OverlayTrigger> */}
                        </p>
                        <Container className="container">
                            <Row>
                                <Col className="wrapper">
                                    <StatsPerMarketPeriod token={accessToken} ></StatsPerMarketPeriod>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="wrapper">
                                    <TransactionsTablePerMarketPeriod token={accessToken} ></TransactionsTablePerMarketPeriod>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="wrapper">
                                    <MapOfAllUsers ></MapOfAllUsers>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                </Col>
                                <Col className="wrapper" lg="8">
                                    <MonthlyEnergyGraph token={accessToken} ></MonthlyEnergyGraph>
                                    <MonthlyFinancialGraph token={accessToken} ></MonthlyFinancialGraph>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col className="wrapper">
                                    <ListOfAllUsers token={accessToken} ></ListOfAllUsers>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="wrapper">
                                    <ListOfAllAssets token={accessToken} ></ListOfAllAssets>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default OperatorView;