import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

import MarketPeriodControl from './MarketPeriodControl';
import StatsPerMarketPeriod from './StatsPerMarketPeriod';
import TransactionsTableWithLocal from './TransactionsTableWithLocal';
import MonthlyEnergyGraph from './MonthlyFinancialGraph';
import MonthlyFinancialGraph from './MonthlyEnergyGraph';
import MapOfAllUsers from './MapOfAllUsers';
import ListOfAllUsers from './ListOfAllUsers';
import ListOfAllAssets from './ListOfAllAssets';
import TransactionsTableWithGrid from './TransactionsTableWithGrid';
import AllTransactionsFilter from './AllTransactionsFilter';

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
                {/* <p className="page-title">Operator View */}
                {/* <OverlayTrigger placement='top' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">As a system operator, you can see all transaction, user, and market information here</Tooltip>}>
                        <span className="d-inline-block">
                            <Button style={{ pointerEvents: 'none' }} size="sm">?</Button>
                        </span>
                    </OverlayTrigger> */}
                {/* </p> */}

                <Container className="container">
                    <Row>
                        <Col className="placeholder-wrapper" lg="5">
                            <p className="page-title">Operator View</p>
                        </Col>
                        <Col className="wrapper">
                            <MarketPeriodControl></MarketPeriodControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <StatsPerMarketPeriod></StatsPerMarketPeriod>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <TransactionsTableWithLocal></TransactionsTableWithLocal>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <TransactionsTableWithGrid></TransactionsTableWithGrid>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <MapOfAllUsers></MapOfAllUsers>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* hacky way to get the graphs centered but not fullscreen */}
                        </Col>
                        <Col className="wrapper" lg="8">
                            <MonthlyEnergyGraph></MonthlyEnergyGraph>
                            <MonthlyFinancialGraph></MonthlyFinancialGraph>
                        </Col>
                        <Col>
                            {/* hacky way to get the graphs centered but not fullscreen */}
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
                    <Row>
                        <Col className="wrapper">
                            <AllTransactionsFilter></AllTransactionsFilter>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default OperatorView;