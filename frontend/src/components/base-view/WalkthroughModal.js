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
                        <div className="center-text">
                            <p className="page-title">Welcome to the USmart Energy Simulation!</p>
                            <p className="walk-text">The purpose of the project, some info, and disclaimers?</p>
                            <p className="walk-text">This dashboard was created to envision the results of a democratized energy future being developed at the USmart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design the next generation of resilient and sustainable power and energy systems.</p>
                        </div>

                        {/* USER TYPE if it's a homeowner or operator */}
                        {this.props.isHomeowner ?
                            <div className="walk-wrapper">
                                {/* if HOMEOWNER */}
                                <p className="walk-title">Homeowner Dashboard</p>
                                <p className="walk-title">this is where you update your account info</p>
                                <Row>
                                    <Col lg="4">
                                        <div className="walk-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nunc eget libero blandit convallis. Aliquam consectetur massa at neque mollis sagittis. Nunc sit amet neque sit amet magna tempus eleifend. Vivamus sit amet condimentum felis. Vivamus metus sem, tincidunt non magna ac, consequat egestas enim. Maecenas efficitur erat at dolor imperdiet, eu molestie lorem feugiat. Ut mi nunc, imperdiet at tortor quis, tincidunt pulvinar sem. Fusce convallis, sapien vel hendrerit faucibus, purus nisl tempor eros, nec placerat ex ligula vitae mi. Ut in efficitur enim.
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width="100%" alt="campus" />
                                        </div>
                                    </Col>
                                </Row>
                                <p className="walk-title">this is where your monthly stats are</p>
                                <div>screenshot</div>
                                <div className="center-content">
                                    <img src={campus} width={400} alt="campus" />
                                </div>
                                <p className="walk-title">this is where you add an electric vehicle charger or a solar panel</p>
                                <div>screenshot</div>
                                <div className="center-content">
                                    <img src={campus} width={400} alt="campus" />
                                </div>
                                <p className="walk-title">this is what the asset creation page looks like</p>
                                <div>creenshot</div>
                                <div className="center-content">
                                    <img src={campus} width={400} alt="campus" />
                                </div>
                            </div>
                            :
                            <div className="walk-wrapper">
                                {/* else OPERATOR */}
                                <p className="walk-title">Operator Dashboard</p>

                                <p className="walk-title">this is where you update your account info</p>
                                <Row>
                                    <Col lg="4">
                                        <div className="walk-text">
                                            <ul>
                                                <li>This will be some more info</li>
                                                <li>This will be some more info</li>
                                                <li>This will be some more info</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width="100%" alt="campus" />
                                        </div>
                                    </Col>
                                </Row>

                                <p className="walk-title">this is where you update your account info</p>
                                <Row>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width="100%" alt="campus" />
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="walk-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nunc eget libero blandit convallis. Aliquam consectetur massa at neque mollis sagittis. Nunc sit amet neque sit amet magna tempus eleifend. Vivamus sit amet condimentum felis. Vivamus metus sem, tincidunt non magna ac, consequat egestas enim. Maecenas efficitur erat at dolor imperdiet, eu molestie lorem feugiat. Ut mi nunc, imperdiet at tortor quis, tincidunt pulvinar sem. Fusce convallis, sapien vel hendrerit faucibus, purus nisl tempor eros, nec placerat ex ligula vitae mi. Ut in efficitur enim.
                                        </div>
                                    </Col>
                                </Row>

                                <p className="walk-title">this is where you update your account info</p>
                                <Row>
                                    <Col lg="4">
                                        <div className="walk-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nunc eget libero blandit convallis. Aliquam consectetur massa at neque mollis sagittis. Nunc sit amet neque sit amet magna tempus eleifend. Vivamus sit amet condimentum felis. Vivamus metus sem, tincidunt non magna ac, consequat egestas enim. Maecenas efficitur erat at dolor imperdiet, eu molestie lorem feugiat. Ut mi nunc, imperdiet at tortor quis, tincidunt pulvinar sem. Fusce convallis, sapien vel hendrerit faucibus, purus nisl tempor eros, nec placerat ex ligula vitae mi. Ut in efficitur enim.
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="center-content">
                                            <img src={campus} width="100%" alt="campus" />
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
