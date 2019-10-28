import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ev from '../../images/ev.png';
import sp from '../../images/sp.png';
import spb from '../../images/sp-battery.png';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Info</p>

                <Row className="center-content">
                    <Col className="info-box">
                        <p className="info-text">Electric Vehicles</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={ev} alt="electric vehicle" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.props.userEVs.length}</div>
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
                                    <div className="info-number">{this.props.userSolars.length}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="info-box">
                        <p className="info-text">Solars & Battery</p>
                        <Row className="center-text">
                            <Col>
                                <img width="85%" src={spb} alt="solar panel with battery" />
                            </Col>
                            <Col>
                                <Row>
                                    <div className="info-number">{this.props.userSolarBatteries.length}</div>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Row className="center-content">
                    <div className="info-text2">{this.props.localTransactions.length} Local Transactions</div>
                </Row>
                <Row className="center-content">
                    <div className="info-text2">{this.props.gridTransactions.length} Grid Transactions</div>
                </Row>
            </div>
        )
    }
}

export default UserInfo;
