import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ev from '../../images/ev.png';
import sp from '../../images/sp.png';
import spb from '../../images/sp-battery.png';

class OperatorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Info</p>
                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={ev} alt="electric vehicle" />
                        <p>Electric Vehicles: ???</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={sp} alt="solar panel" />
                        <p>Solar Panels: ???</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <img className="img-fluid mb-3 mb-md-0" width="50rem" src={spb} alt="solar panel with battery" />
                        <p>Solar Battery: ???</p>
                    </Col>
                </Row>

                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <p>Local transactions: ???</p>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <p>Grid transactions: ???</p>
                    </Col>
                </Row>

                <Row className="center-text">
                    <Col className="placeholder-wrapper">
                        <p>Total number of users</p>
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

export default OperatorInfo;
