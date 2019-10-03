import React, { Component } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import group from '../../images/group2.JPG';
import parvania from '../../images/parvania.jpg';
import panels from '../../images/panels.jpg';
import campus from '../../images/campus.jpg';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <p className="page-title">About the Project</p>
                <Tab.Container defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className="custom-pill">Intro</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className="custom-pill">Abstract</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third" className="custom-pill">People</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth" className="custom-pill">USmart Energy Lab</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth" className="custom-pill">Privacy</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <p className="page-subtitle">Intro</p>
                                    <p>This dashboard was created to envision the results of a democratized energy future being developed at the USmart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design the next generation of resilient and sustainable power and energy systems.</p>
                                    <img className="about-page-photo" src={panels} alt="solar panels" />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <p className="page-subtitle">Abstract</p>
                                    <p>There is a relationship between time and cost that we are hoping to take advantage of with our distributed energy resources. In our current system, energy is bought and sold in day-ahead and hour ahead markets from traditional utility generators, such as gas and coal power plants. Energy transacted in the hour-ahead market is more costly than energy transacted in the day-ahead market due in part to the need being more immediate. Any deviation from the day-ahead and hour-ahead energy demand forecast is made up in the 15-minute or real-time market. 15-minute energy is even more expensive than the day-ahead and hour-ahead and it is often more costly for traditional power plants to ramp-up/down quickly to meet 15-minute demand, as these gas and coal plants are massive mechanical machines with huge inertia. Thus, the market must go to even more expensive sources of energy. Here is where we have opportunities to operate more efficiently by taking advantage of load resources at the residential distribution level.</p>
                                    <p>Our revised system avoids expensive deviations by adding flexibility to demand in two ways. The deadline-based queueing of IoT device powering spreads out demand over time. Second, we diversify where a consumer’s energy is coming from. Demand is shifted from the central utility to other homeowners, so the central utility will move to non-renewable energy plants less frequently. Homeowners are also further incentivized to produce their own renewable energy, as they can profit more from their excess resources. Not only is this system cheaper and more profitable for both consumers and producers, it is more sustainable and eco-friendly for a world with increasing energy demands. We see this system not just as something homeowners will want to move towards to save money, but one that society will eventually need to move towards to prevent an energy crisis.</p>
                                    <img className="about-page-photo" src={campus} alt="campus" />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <p className="page-subtitle">People</p>
                                    <p>This project is led by Dr. Masood Parvania and Alex Palomino in the Utah Smart Energy Lab. This dashboard and underlying technologies were built by Roman Clark, Jared Hansen, Jason Hansen, and Parker Stewart at the School of Computing at the University of Utah.</p>
                                    <img className="about-page-photo" src={group} alt="the group" />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <p className="page-subtitle">USmart Energy Lab</p>
                                    <a href="https://usmart.ece.utah.edu/">https://usmart.ece.utah.edu/</a>
                                    <p>50 S. Central Campus Drive, Room 1232, University of Utah, Salt Lake City, UT 84112</p>
                                    <img className="about-page-photo" src={parvania} alt="dr masood parvania" />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                    <p className="page-subtitle">Privacy</p>
                                    <div>
                                        <p>On this website we collect:</p>
                                        <ul>
                                            <li>Name</li>
                                            <li>Address</li>
                                            <li>Information about your electric vehicles and solar panels if you choose to register them with us</li>
                                        </ul>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        );
    }

}

export default About;