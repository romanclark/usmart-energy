import React, { Component } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

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
                        <img className="walk-logo" src={logo} alt="usmart logo" />
                        {this.props.isHomeowner ?
                            <Modal.Title id="contained-modal-title-vcenter">&nbsp;Homeowner Walkthrough</Modal.Title>
                            :
                            <Modal.Title id="contained-modal-title-vcenter">&nbsp;Operator Walkthrough</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>

                        {/* WELCOME */}
                        <p className="center-text page-title">Welcome to the USmart Energy Simulation</p>
                        <div>
                            <p className="walk-text2">This dashboard was created to envision the results of a democratized energy future being developed at the USmart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design the next generation of resilient and sustainable power and energy systems.</p>
                        </div>

                        {/* USER TYPE if it's a homeowner or operator */}
                        {this.props.isHomeowner ?
                            <div className="walk-wrapper">
                                {/* if HOMEOWNER */}
                                <p className="walk-title">Homeowner Dashboard</p>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Adding An Asset</p>
                                            <p className="walk-text2">An asset is an electric vehicle charger, a solar panel, or a solar panel with battery storage.</p>
                                            <ul className="walk-text">
                                                <li>On the homeower dashboard, scroll to the list of your assets</li>
                                                <li>If you don't have any assets yet, click the "click here"</li>
                                                <li>If you have some assets already, click the "Add A New Asset"</li>
                                                <li>In the "Create New Asset" form:</li>
                                                <ul>
                                                    <li>Select the Asset Class to begin the form</li>
                                                    <li>Fill out all the enabled fields</li>
                                                </ul>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width={500} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Changing Your Device's Charging Deadline</p>
                                            <ul className="walk-text">
                                                <li>On the homeower dashboard, scroll to the list of your assets</li>
                                                <li>Click the small blue "Update" button next to the charger</li>
                                                <li>In the green box, update your device deadline as needed</li>
                                                <li>Make sure to submit your new deadline by clicking the "Update" button</li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width={500} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Update Your Account Information</p>
                                            <ul>
                                                <li>On the homeower dashboard, click the "Edit My Account" button in the green box</li>
                                                <li>Update the fields you need to change</li>
                                                <li>Click update</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width={500} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">View Your Stats and General Information</p>
                                            <ul>
                                                <li>The "Info" gives a high-level view of how the simulation is interacting with your account</li>
                                                <li>The "My Monthly Stats" section displays money and energy distribution over the course of the current month</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width={500} alt="campus" />
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
                                            <div className="walk-text2">The simulation controls are used to run the simulation. The purpose of the simulation is a proof-of-concept with scheduling and handling the energy demands of many users. When the simulation is running, dummy assets (of all types) are created and recieve randomized values. For example, solar panels will recieve energy only during the daytime.</div>
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
                                            <img src={campus} width={500} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="walk-section">
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <p className="walk-subtitle">Update Your Account Information</p>
                                            <ul>
                                                <li>On the homeower dashboard, click the "Edit My Account" button in the green box</li>
                                                <li>Update the fields you need to change</li>
                                                <li>Click update</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width={500} alt="campus" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        }

                        {/* ENJOY! */}
                        <div>
                            <p className="walk-title center-content">Enjoy the Simulation!</p>
                            <p className="walk-title">if you have questions at any point, go here for definitions, help, google home setup, and project info</p>
                            <p className="walk-title">look for the [?] tooltip if you have any definition questions</p>
                            <p className="walk-title">If you need to view this information again, click the button on the about page!</p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default WalkthroughModal;
