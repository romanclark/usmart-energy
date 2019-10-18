import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { FaHome, FaUser } from 'react-icons/fa';

class UserName extends Component {
    render() {
        return (
            <AuthConsumer>
                {({ user }) => (
                    <div>
                        <Row>
                            <Col sm="3">
                                <img className="rounded-circle img-fluid operator-profile-picture mb-3 mb-md-0" src={user.picture} alt="user" />
                            </Col>
                            <Col className="operator-fields">
                                <Row>
                                    <Col>
                                        <p className="operator-name">{this.props.firstName} {this.props.lastName}</p>
                                    </Col>
                                    <Col className="align-right">
                                        <LinkContainer to={"/updateuser/"}>
                                            <Button className="top-margin right-margin2" variant="dark"><FaUser />&nbsp;Edit My Account</Button>
                                        </LinkContainer>
                                    </Col>
                                </Row>
                                <p className="operator-info">{this.props.email}</p>
                                <p className="operator-info">{this.props.street}</p>
                                <p className="operator-info">{this.props.city}</p>
                                <p className="operator-info">{this.props.zip}</p>
                                <p className="dashboard-type operator-info"><FaHome className="icon" size="2rem"></FaHome>&nbsp;Homeowner Dashboard</p>
                            </Col>
                        </Row>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default UserName;
