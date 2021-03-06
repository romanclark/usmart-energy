import React, { Component } from 'react';
import { Button, Tab, Row, Col, Nav } from 'react-bootstrap';

import { AuthConsumer } from '../auth/authContext';
import WalkthroughModal from '../base-view/WalkthroughModal';

import logo from '../../images/Smart-Energy.png';
import roman from '../../images/roman.png';
import jared from '../../images/jared.png';
import jason from '../../images/jason.png';
import parker from '../../images/parker.png';
import parvania from '../../images/parvania.jpg';
import panels from '../../images/panels.jpg';
import campus from '../../images/campus.jpg';
import elliot from '../../images/elliot-poster.png';
import assistant from '../../images/assistant.png';
import arduino from '../../images/arduino.jpg';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleButton() {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <AuthConsumer>
                {({ user }) => (
                    <div className="wrapper about">
                        <WalkthroughModal
                            show={this.state.show}
                            handleClose={this.handleClose}
                            isHomeowner={user.role !== "admin"}> {/* changed from === "user" just so that when not logged in, it will default to the user dashbaord */}
                        </WalkthroughModal>
                        <div className="align-right">
                            <img className="about-page-logo" src={logo} alt="usmart logo" />
                        </div>
                        <div className="center-text">
                            <p className="page-title">About the Project</p>
                            <p className="page-subtitle2">Team Electric Avenue & USmart Energy Lab</p>
                            {user.role !== "admin" ?
                                <Button variant="warning" onClick={this.handleButton}>Show User Walkthrough</Button>
                                :
                                <Button variant="warning" onClick={this.handleButton}>Show Operator Walkthrough</Button>}
                        </div>
                        <Tab.Container defaultActiveKey="first">
                            <Row className="top-margin2">
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first" className="custom-pill">About</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third" className="custom-pill">Team Member Page</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth" className="custom-pill">Google Home</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fifth" className="custom-pill">IoT Devices</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="sixth" className="custom-pill">USmart Energy Lab</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="seventh" className="custom-pill">Previous Work</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="last" className="custom-pill">Privacy</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <p className="page-subtitle">About</p>
                                            <Row>
                                                <Col lg={5}>
                                                    <p className="page-subtitle2">This dashboard was created to envision the results of a democratized energy future being developed at the USmart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design the next generation of resilient and sustainable power and energy systems.</p>
                                                </Col>
                                                <Col>
                                                    <img className="about-page-photo" src={campus} alt="campus" />
                                                </Col>
                                            </Row>
                                            <p className="page-subtitle">Absract</p>
                                            <Row>
                                                <p>There is a relationship between time and cost that we are hoping to take advantage of with our distributed energy resources. In our current system, energy is bought and sold in day-ahead and hour ahead markets from traditional utility generators, such as gas and coal power plants. Energy transacted in the hour-ahead market is more costly than energy transacted in the day-ahead market due in part to the need being more immediate. Any deviation from the day-ahead and hour-ahead energy demand forecast is made up in the 15-minute or real-time market. 15-minute energy is even more expensive than the day-ahead and hour-ahead and it is often more costly for traditional power plants to ramp-up/down quickly to meet 15-minute demand, as these gas and coal plants are massive mechanical machines with huge inertia. Thus, the market must go to even more expensive sources of energy. Here is where we have opportunities to operate more efficiently by taking advantage of load resources at the residential distribution level.</p>
                                            </Row>
                                            <Row>
                                                <p>Our revised system avoids expensive deviations by adding flexibility to demand in two ways. The deadline-based queueing of IoT device powering spreads out demand over time. Second, we diversify where a consumer’s energy is coming from. Demand is shifted from the central utility to other homeowners, so the central utility will move to non-renewable energy plants less frequently. Homeowners are also further incentivized to produce their own renewable energy, as they can profit more from their excess resources. Not only is this system cheaper and more profitable for both consumers and producers, it is more sustainable and eco-friendly for a world with increasing energy demands. We see this system not just as something homeowners will want to move towards to save money, but one that society will eventually need to move towards to prevent an energy crisis.</p>
                                            </Row>
                                            <Row>
                                                <img className="about-page-photo" src={panels} alt="panels" />
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <p className="page-subtitle">Team Member Page</p>
                                            <p className="page-subtitle2">Electric Avenue is a Computer Science undergraduate senior capstone team at the University of Utah consisting of Roman Clark, Jared Hansen, Jason Hansen, and Parker Stewart. The main project is guided by Dr. Masood Parvania and Alex Palomino from the Utah Smart Energy Lab.</p>
                                            <p>This dashboard and underlying technologies were built by the undergraduates during Spring 2019 and Fall 2019 semesters.</p>
                                            <Row className="google-border">
                                                <Col lg={3}>
                                                    <img className="about-page-photo" src={roman} alt="roman" />
                                                </Col>
                                                <Col>
                                                    <p className="page-subtitle">Roman Clark</p>
                                                    <p>Roman has a mathematics background and is interested in algorithms and data. His degree is an Honors Degree in Computer Science BS. After graduation he will be working at Avalanche Software as an Analytics Engineering Intern. He focused on the creation of the demand scheduler and the matching algorithm in the peer-to-peer marketplace. He built the Arduino IoT device and implemented the MQTT protocol. He also helped Parker implement Google Home communication.</p>
                                                    <p>Email: roman.g.clark@gmail.com</p>
                                                    <p>GitHub: <a href="https://github.com/romanclark">https://github.com/romanclark</a></p>
                                                </Col>
                                            </Row>
                                            <Row className="google-border">
                                                <Col lg={3}>
                                                    <img className="about-page-photo" src={jared} alt="jared" />
                                                </Col>
                                                <Col>
                                                    <p className="page-subtitle">Jared Hansen</p>
                                                    <p>Jared has worked in iOS development with RESTful API integration and enjoys working with databases. His degree is a Computer Science BS. After graduation he will be working at Galileo as a Backend Software Engineer. He focused his efforts on designing and deploying the server, which allowed for communication between all entities. He also helped designing the database schemas that are used throughout the server. He was responsible for the Auth0 login integration and aided Parker with Google Home integration.</p>
                                                    <p>Email: jared.hansn8@gmail.com</p>
                                                    <p>LinkedIn: <a href="https://www.linkedin.com/in/jared-hansen13/">https://www.linkedin.com/in/jared-hansen13/</a></p>
                                                    <p>GitHub: <a href="https://github.com/jhansen8">https://github.com/jhansen8</a></p>
                                                </Col>
                                            </Row>
                                            <Row className="google-border">
                                                <Col lg={3}>
                                                    <img className="about-page-photo" src={jason} alt="jason" />
                                                </Col>
                                                <Col>
                                                    <p className="page-subtitle">Jason Hansen</p>
                                                    <p>Jason focused on the frontend application UI and the design. He has worked with MVC in web software in the past. His degree is a Computer Science BS. After graduation he will be working at MasterControl as a Software Engineer. In addition to frontend, he helped Jared with the server communication and database management to make sure all data is handled neatly.</p>
                                                    <p>Email: jbhansen016@gmail.com</p>
                                                    <p>LinkedIn: <a href="https://www.linkedin.com/in/jason-hansen-673963116/">https://www.linkedin.com/in/jason-hansen-673963116/</a></p>
                                                    <p>GitHub: <a href="https://github.com/jasonhansen1">https://github.com/jasonhansen1</a></p>
                                                </Col>
                                            </Row>
                                            <Row className="google-border">
                                                <Col lg={3}>
                                                    <img className="about-page-photo" src={parker} alt="parker" />
                                                </Col>
                                                <Col>
                                                    <p className="page-subtitle">Parker Stewart</p>
                                                    <p>Parker has an interest in home technology and related IoT devices, so he worked on the Google Home communication. His degree is a Computer Science BS. After graduation he will be working at works at Vivint.SmartHome as a Software Engineer. He also has experience in web design, so he played a rol in helping Jason with the application UI.</p>
                                                    <p>Email: parkercstewart@icloud.com</p>
                                                    <p>GitHub: <a href="https://github.com/pstewy">https://github.com/pstewyk</a></p>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fourth">
                                            <div className="google-text">
                                                <div className="center-content">
                                                    <img className="google-logo" src={assistant} alt="google assistant" />
                                                </div>
                                                <p className="page-subtitle2">"Google Home is a brand of smart speakers developed by Google.... Google Home devices also have integrated support for home automation, letting users control smart home appliances with their voice.”</p>
                                                <div className="google-border">
                                                    <p className="google-subtitle2">To begin interaction with the Google Home application</p>
                                                    <p>"Hey Google, Talk to Electric Avenue."</p>
                                                    <ul>
                                                        <li>This will bring up the test version of the application, and it will prompt you to ask it something</li>
                                                    </ul>
                                                    <p className="google-subtitle2">To invoke Google Home for a one-time interaction</p>
                                                    <p>"Hey Google, tell Electric Avenue tell me my assets"</p>
                                                    <ul>
                                                        <li>This will bring up the test version, it will perform the action, and then it will end the conversation</li>
                                                    </ul>
                                                </div>
                                                <p className="google-subtitle">Possible Actions</p>
                                                <Row>
                                                    <Col>
                                                        <p className="google-subtitle2">Asset Charge Level</p>
                                                        <ul>
                                                            <li>"What is the charge level for &lt;asset_name&gt;?"</li>
                                                            <li>"How much charge does &lt;asset_nickname&gt; have?"</li>
                                                            <li>"Tell me &lt;asset_nickname&gt; charge level?"</li>
                                                        </ul>
                                                        <p className="google-subtitle2">Change Asset to Flexible</p>
                                                        <ul>
                                                            <li>"Set &lt;asset_nickname&gt; to flexible"</li>
                                                            <li>"Make &lt;asset_nickname&gt; flexible"</li>
                                                            <li>"Update &lt;asset_nickname&gt; to flexible."</li>
                                                            <li>"Change &lt;asset_nickname&gt; to flexible."</li>
                                                        </ul>

                                                        <p className="google-subtitle2">Change Asset to Inflexible</p>
                                                        <ul>
                                                            <li>"Set &lt;asset_nickname&gt; to inflexible"</li>
                                                            <li>"Set &lt;asset_nickname&gt; to not flexible"</li>
                                                            <li>"Change &lt;asset_nickname&gt; to not flexible"</li>
                                                            <li>"Make &lt;asset_nickname&gt; not flexible"</li>
                                                            <li>"Update &lt;asset_nickname&gt; to inflexible"</li>
                                                        </ul>
                                                        <p className="google-subtitle2">Get My Assets</p>
                                                        <ul>
                                                            <li>"Get my assets."</li>
                                                            <li>"Tell me my assets"</li>
                                                            <li>"What are my assets?"</li>
                                                        </ul>
                                                    </Col>
                                                    <Col>
                                                        <p className="google-subtitle2">Set Device to Available</p>
                                                        <ul>
                                                            <li>"Make &lt;asset_nickname&gt;available"</li>
                                                            <li>"Set &lt;asset_nickname&gt; to available"</li>
                                                        </ul>
                                                        <p className="google-subtitle2">Set Device to Unavailable</p>
                                                        <ul>
                                                            <li>"Make &lt;asset_nickname&gt; unavailable"</li>
                                                            <li>"Set &lt;asset_nickname&gt; to unavailable"</li>
                                                            <li>"Set &lt;asset_nickname&gt; to un-available"</li>
                                                        </ul>

                                                        <p className="google-subtitle2">Update Device Deadline</p>
                                                        <ul>
                                                            <li>"Set the deadline for &lt;asset_nickname&gt; to &lt;deadline&gt;"</li>
                                                            <li>"Change &lt;asset_nickname&gt; deadline to &lt;deadline&gt;"</li>
                                                            <li>"Update asset deadline for &lt;asset_nickname&gt; to &lt;deadline&gt;"</li>
                                                        </ul>

                                                        <p className="google-subtitle2">What else ean the app do?</p>
                                                        <ul>
                                                            <li>"What can I do?"</li>
                                                            <li>"What can you help me with?"</li>
                                                            <li>"What are your actions?"</li>
                                                            <li>"What can you do?"</li>
                                                            <li>"What can I tell you?"</li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fifth">
                                            <div className="center-content">
                                                <img className="arduino-photo " src={arduino} alt="arduino uno product" />
                                            </div>
                                            <p className="page-subtitle">IoT Devices</p>
                                            <div>
                                                <p>To take advantage of the flexible loads of plug-in electric vehicles (PEVs), PEVs in our system must be charged by a specifically designed IoT PEV charger that listens for messages sent from our application. Using the MQTT (MQ Telemetry Transport) messaging protocol (often used as a standard for IoT communication), each IoT charger subscribes to a unique “topic” based on a labeled unique identifier. Our system publishes messages to these topics to signal the charging times of the connected vehicle. These chargers are still currently in development, so in order to fully test that the MQTT communication could control the flow of energy and correctly did so only at times determined by our system, we needed a mock IoT device with capability to listen for incoming MQTT messages and draw energy accordingly. We created a “Smart Outlet” with an Arduino Uno, connected to wireless internet through an ESP8266 module. This device listens for ‘charging’ and ‘off’ messages sent every market period from the server, controlling a 5V relay module within an outlet box, switching on and off its external power draw. During presentation, we plugged a lamp into this smart outlet and the lamp flashing on and off served as a visual demonstration of the charging schedules of our application.</p>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="sixth">
                                            <p className="page-subtitle">USmart Energy Lab</p>
                                            <p className="page-subtitle2">"Our mission is to design the next generation of resilient and sustainable power and energy systems that integrates emerging energy technologies and distributed energy resources."</p>
                                            <a href="https://usmart.ece.utah.edu/">https://usmart.ece.utah.edu/</a>
                                            <p>50 S. Central Campus Drive, Room 1232<br></br>University of Utah<br></br>Salt Lake City, UT<br></br>84112</p>
                                            <img className="about-page-photo" src={parvania} alt="dr masood parvania" />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="seventh">
                                            <p className="page-subtitle">Elliot Carr-Lee and Austin Waung, EE Undergraduate Project</p>
                                            <p className="page-subtitle2">Their work consisted of a connected Raspberry Pi to simulate a electric vehicle charger implemented with the MQTT protocol.</p>
                                            <img className="about-page-photo" src={elliot} alt="elliot poster" />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="last">
                                            <p className="page-subtitle">Privacy</p>
                                            <div>
                                                <p className="page-subtitle2">This is a university senior project. We do not share your personal information with outside sources.</p>
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
                )}
            </AuthConsumer>
        );
    }

}

export default About;
