import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { Redirect } from "react-router-dom";

import MarketPeriodControl from './MarketPeriodControl';
import StatsPerMarketPeriod from './StatsPerMarketPeriod';
// import TransactionsTableWithLocal from './TransactionsTableWithLocal';
// import TransactionsTableWithGrid from './TransactionsTableWithGrid';
import TransactionsTableComponentScrollable from './TransactionsTableComponentScrollable';
import MonthlyEnergyGraph from './MonthlyFinancialGraph';
import MonthlyFinancialGraph from './MonthlyEnergyGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsersScrollable from './ListOfAllUsersScrollable';
import ListOfAllAssetsScrollable from './ListOfAllAssetsScrollable';
import AllTransactionsFilter from './AllTransactionsFilter';

class OperatorView extends Component {

    constructor(props) {
        super(props);

        // bind functions
        // this.handleMouseHover = this.handleMouseHover.bind(this);

        // initialize state
        this.state = {
            // focused: false
        };
    }

    componentDidMount() {
        // var self = this;
    }

    // handleMouseHover() {
    //     this.setState({ focused: !this.state.focused });
    // }

    render() {
        return (
            <AuthConsumer>
                {({ accessToken }) => (
                    <div className="operator--view container">
                        {!accessToken ? <Redirect to="/404" /> : <div>
                            <Container className="container">
                                <Row>
                                    <Col className="operator-title-wrapper" sm="4">
                                        <div className="operator-page-title">Operator View</div>
                                    </Col>
                                    <Col className="wrapper">
                                        <MarketPeriodControl token={accessToken}></MarketPeriodControl>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col onMouseEnter={this.handleMouseHover}
                                    onMouseLeave={this.handleMouseHover}
                                    className={this.state.focused ? "wrapper in-component" : "wrapper"}>
                                    <StatsPerMarketPeriod></StatsPerMarketPeriod>
                                </Col> */}
                                    <Col className="wrapper">
                                        <StatsPerMarketPeriod token={accessToken}></StatsPerMarketPeriod>
                                    </Col>
                                </Row>
                                {/* <Row>
                                <Col className="wrapper">
                                    <TransactionsTableWithLocal token={accessToken}></TransactionsTableWithLocal>
                                </Col>
                            </Row> */}
                                {/* <Row>
                                <Col className="wrapper">
                                    <TransactionsTableWithGrid token={accessToken}></TransactionsTableWithGrid>
                                </Col>
                            </Row> */}
                                <Row> {/* LOCAL TRANSACTIONS */}
                                    <Col className="wrapper">
                                        <TransactionsTableComponentScrollable
                                            token={accessToken}
                                            title={"Local Transactions for Most Recent Market Period"}
                                            is_with_grid={0}>
                                        </TransactionsTableComponentScrollable>
                                    </Col>
                                </Row>
                                <Row> {/* GRID TRANSACTIONS */}
                                    <Col className="wrapper">
                                        <TransactionsTableComponentScrollable
                                            token={accessToken}
                                            title={"Grid Transactions for Most Recent Market Period"}
                                            is_with_grid={1}>
                                        </TransactionsTableComponentScrollable>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="wrapper">
                                        <AllTransactionsFilter token={accessToken}></AllTransactionsFilter>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="wrapper">
                                        <MapOfAllUsers token={accessToken}></MapOfAllUsers>
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
