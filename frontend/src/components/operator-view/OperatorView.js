import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { Redirect } from "react-router-dom";

import OperatorName from './OperatorName';
import MarketPeriodControl from './MarketPeriodControl';
import OperatorInfo from './OperatorInfo';
import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTableComponentScrollable from './TransactionsTableComponentScrollable';
import MonthlyEnergyGraph from './MonthlyFinancialGraph';
import MonthlyFinancialGraph from './MonthlyEnergyGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsersScrollable from './ListOfAllUsersScrollable';
import ListOfAllAssetsScrollable from './ListOfAllAssetsScrollable';
import AllTransactionsFilter from './AllTransactionsFilter';

class OperatorView extends Component {
    render() {
        return (
            <AuthConsumer>
                {({ accessToken }) => (
                    <div className="container">
                        {!accessToken ? <Redirect to="/404" /> : <div>
                            <Container className="container">
                                <Row>
                                    <Col className="operator-name-wrapper">
                                        <OperatorName></OperatorName>
                                    </Col>
                                    <Col className="wrapper">
                                        <MarketPeriodControl token={accessToken}></MarketPeriodControl>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="wrapper">
                                        <StatsPerMarketPeriod token={accessToken}></StatsPerMarketPeriod>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col className="wrapper">
                                        <TransactionsTableComponentScrollable
                                            token={accessToken}
                                            title={"Current Local Transactions"}
                                            is_with_grid={0}>
                                        </TransactionsTableComponentScrollable>
                                    </Col>
                                    <Col className="wrapper">
                                        <TransactionsTableComponentScrollable
                                            token={accessToken}
                                            title={"Current Grid Transactions"}
                                            is_with_grid={1}>
                                        </TransactionsTableComponentScrollable>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col className="wrapper" lg="8">
                                        <MapOfAllUsers token={accessToken}></MapOfAllUsers>
                                    </Col>
                                    <Col className="wrapper">
                                        <OperatorInfo></OperatorInfo>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="wrapper">
                                        <AllTransactionsFilter token={accessToken}></AllTransactionsFilter>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {/* hacky way to get the graphs centered but not fullscreen */}
                                    </Col>
                                    <Col className="wrapper" lg="8">
                                        <MonthlyEnergyGraph token={accessToken}></MonthlyEnergyGraph>
                                        <MonthlyFinancialGraph token={accessToken}></MonthlyFinancialGraph>
                                    </Col>
                                    <Col>
                                        {/* hacky way to get the graphs centered but not fullscreen */}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="wrapper">
                                        <ListOfAllUsersScrollable token={accessToken}></ListOfAllUsersScrollable>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="bottom wrapper">
                                        <ListOfAllAssetsScrollable token={accessToken}></ListOfAllAssetsScrollable>
                                    </Col>
                                </Row>
                            </Container>
                        </div>}
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default OperatorView;
