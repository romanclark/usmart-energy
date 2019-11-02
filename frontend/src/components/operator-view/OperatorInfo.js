import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ev from '../../images/ev.png';
import sp from '../../images/sp.png';
import spb from '../../images/sp-battery.png';
import users from '../../images/users.png';
import local from '../../images/local.png';
import grid from '../../images/grid.png';

import UsersService from '../user-view/UsersService';
import AssetsService from '../assets/AssetsService';
import TransactionsService from './TransactionsService';

const usersService = new UsersService();
const assetsService = new AssetsService();
const transactionsService = new TransactionsService();

class OperatorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            assets: [],
            transactions: []
        };
    }

    componentDidMount() {
        var self = this;
        usersService.getAllUsers(this.props.token).then(function (result) {
            self.setState({ users: result.data })
        });
        assetsService.getAllAssets(this.props.token).then(function (result) {
            self.setState({ assets: result.data })
        });
        transactionsService.getAllTransactions(this.props.token).then(function (result) {
            self.setState({ transactions: result.data })
        });
    }

    render() {
        return (
            <div className="left-margin right-margin">
                <p className="page-subtitle">Info Totals</p>

                <Row className="center-content">
                    <Col className="info-box">
                        <p className="info-text">EV Chargers</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={ev} alt="electric vehicle" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.assets.filter(a => a.asset_class === "Electric Vehicle").length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="info-box">
                        <p className="info-text">Solar Panels</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={sp} alt="solar panel" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.assets.filter(a => a.asset_class === "Solar Panel").length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="info-box">
                        <p className="info-text">Solar Batteries</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={spb} alt="solar panel with battery" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.assets.filter(a => a.asset_class === "Solar Panel with Battery").length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="center-content">
                    <Col className="info-box">
                        <p className="info-text">Total Users</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={users} alt="users icon" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.users.length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="info-box">
                        <p className="info-text">Local</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={local} alt="local transactions" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.transactions.filter(t => t.is_with_grid === false).length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="info-box">
                        <p className="info-text">Grid</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={grid} alt="grid transactions" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.state.transactions.filter(t => t.is_with_grid === true).length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OperatorInfo;
