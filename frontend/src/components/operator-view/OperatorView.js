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
import Loading from '../base-view/Loading';
import Can from "../auth/Can";

class OperatorView extends Component {
    render() {
        return (
            <AuthConsumer>
                {({ accessToken, loading, loginRequired, user }) => (
                    <div className="container">
                        {loginRequired ? (<Redirect to="/" />) : (<div></div>)}
                        {loading ? (
                            <div>
                                <Loading type="spinner-homeowner"></Loading>
                            </div>
                        ) : (
                                <div>
                                    <Can
                                        role={user.role}
                                        perform="homeowner-pages:visit"
                                        yes={() => (
                                            <Redirect to="/homeowner/" />
                                        )}
                                    />
                                    <Container className="container">
                                        <Row>
                                            <Col className="operator-name-wrapper" lg="7">
                                                <OperatorName
                                                    user={user}
                                                    token={accessToken}>
                                                </OperatorName>
                                            </Col>
                                            <Col className="wrapper">
                                                <MarketPeriodControl token={accessToken}></MarketPeriodControl>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper" sm="6">
                                                <TransactionsTableComponentScrollable
                                                    token={accessToken}
                                                    title={"Latest Local Transactions"}
                                                    is_with_grid={0}>
                                                </TransactionsTableComponentScrollable>
                                            </Col>
                                            <Col className="wrapper">
                                                <TransactionsTableComponentScrollable
                                                    token={accessToken}
                                                    title={"Latest Grid Transactions"}
                                                    is_with_grid={1}>
                                                </TransactionsTableComponentScrollable>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper">
                                                <StatsPerMarketPeriod token={accessToken}></StatsPerMarketPeriod>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="wrapper" lg="7">
                                                <MapOfAllUsers token={accessToken}></MapOfAllUsers>
                                            </Col>
                                            <Col className="wrapper">
                                                <OperatorInfo token={accessToken}></OperatorInfo>
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
                                </div>
                            )}
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default OperatorView;
