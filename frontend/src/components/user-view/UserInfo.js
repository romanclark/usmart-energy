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
                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={ev} alt="electric vehicle" />
                        <p>Electric Vehicles: {this.props.userEVs.length}</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={sp} alt="solar panel" />
                        <p>Solar Panels: {this.props.userSolars.length}</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={spb} alt="solar panel with battery" />
                        <p>Solar Battery: {this.props.userSolarBatteries.length}</p>
                    </Col>
                </Row>

                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <p>Local transactions: {this.props.localTransactions.length}</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <p>Grid transactions: {this.props.gridTransactions.length}</p>
                    </Col>
                </Row>

                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <p>What else?</p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserInfo;
