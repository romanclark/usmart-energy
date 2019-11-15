import React, { Component } from 'react';
import { Modal, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

import logo from '../../images/Smart-Energy.png';
import campus from '../../images/campus.jpg';

class WalkthroughModal extends Component {
    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    centered={true}
                    scrollable={true}
                    backdrop="static"
                    onHide={this.props.handleClose}
                    className="walk-font"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        {this.props.isHomeowner ?
                            <Modal.Title className="walk-modal-title" id="contained-modal-title-vcenter">&nbsp;Homeowner Walkthrough</Modal.Title>
                            :
                            <Modal.Title className="walk-modal-title" id="contained-modal-title-vcenter">&nbsp;Operator Walkthrough</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body className="walk-modal">

                        {/* WELCOME */}
                        <div className="center-text">
                            <img className="walk-logo" src={logo} alt="usmart logo" />
                            <p className="walk-title">Welcome to the USmart Energy Simulation!</p>
                        </div>
                        <div>
                            <p className="walk-subtitle2 bottom">This dashboard was created to envision the results of a democratized energy future
                                being developed at the USmart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the
                                University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design
                                the next generation of resilient and sustainable power and energy systems.</p>
                        </div>

                        {/* USER TYPE if it's a homeowner or operator */}
                        {this.props.isHomeowner ?
                            <div className="walk-wrapper">
                                {/* if HOMEOWNER */}
                                <p className="walk-title">Homeowner Dashboard</p>

                                <Row className="walk-section">
                                    <Col lg="5">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Adding An Asset</p>
                                            <p className="walk-subtitle2">An asset is an electric vehicle charger, a solar panel, or a solar panel with battery storage.</p>
                                            <ul className="walk-text">
                                                <li>On the Homeower Dashboard, scroll to the list of your assets</li>
                                                <li>If you don't have any assets yet, click the "Click Here" button</li>
                                                <li>If you have some assets already, click the "Add A New Asset" button</li>
                                                <li>In the "Create New Asset" form:</li>
                                                <ol>
                                                    <li>Select the Asset Class to begin the form</li>
                                                    <li>Fill out all the enabled fields</li>
                                                    <li>Submit new asset with the "Create" button</li>
                                                </ol>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="5">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Changing An Asset Charging Deadline</p>
                                            <p className="walk-subtitle2">An asset's deadline determines by when it will be completely charged. Deadlines are only available for electric vehicle chargers.</p>
                                            <ul className="walk-text">
                                                <li>On the homeower dashboard, scroll to the list of your assets</li>
                                                <li>Click the small blue "Update" button next to the charger</li>
                                                <li>In the green box, update your device deadline as needed</li>
                                                <li>Submit new deadline with the "Update" button</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="5">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">View Stats and General Information</p>
                                            <ul>
                                                <li>The "Info" gives a high-level view of how the simulation is interacting with your account</li>
                                                <li>The "Monthly Stats" section displays money and energy distribution over the course of the current month</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="5">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Updating Account Information</p>
                                            <ul>
                                                <li>On the homeower dashboard, click the "Edit Account" button in the green box</li>
                                                <li>Update the fields you need to change</li>
                                                <li>Click update</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            :

                            <div className="walk-wrapper">
                                {/* else OPERATOR */}
                                <p className="walk-title">Operator Dashboard</p>


                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Controlling the Simulation</p>
                                            <div className="walk-subtitle2">The simulation controls are used to run the simulation. The purpose
                                                of the simulation is a proof-of-concept with scheduling and handling the energy demands of many
                                                users. When the simulation is running, dummy assets (of all types) are created and recieve randomized
                                                values. For example, solar panels will recieve energy only during the daytime.</div>
                                            <ul>
                                                <li>A fresh simulation begins at nighttime</li>
                                                <li>The simulation will </li>
                                                <li>Solar panels begin to recieve energy during the daytime, beginning at 10:00am</li>
                                                <li>You can skip to the next market period</li>
                                                <li>You can play, pause, and reset the simulation at any time</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Update Your Account Information</p>
                                            <ul>
                                                <li>On the homeower dashboard, click the "Edit Account" button in the green box</li>
                                                <li>Update the fields you need to change</li>
                                                <li>Click update</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img className="walk-image" src={campus} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        }

                        {/* ENJOY! */}
                        <div className="bottom">
                            <p className="walk-title">Enjoy the Simulation!</p>
                            <p className="walk-subtitle">Where to go when you have questions</p>
                            <ul className="walk-text">
                                <li>To view this walkthrough again, navigate to the About page and click the "Show Walkthrough" button</li>
                                <li>Throughout the site, hover over the
                                    <OverlayTrigger placement='top' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">This will give you more info!</Tooltip>}>
                                        <span className="d-inline-block">
                                            <Button className="tooltip-text" disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                        </span>
                                    </OverlayTrigger>
                                    if you have any questions regarding definitions</li>
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default WalkthroughModal;
