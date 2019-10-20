import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { FaChartLine } from 'react-icons/fa';

class OperatorName extends Component {
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
                                <p className="dashboard-type operator-info"><FaChartLine className="icon" size="2rem"></FaChartLine>&nbsp;Operator Dashboard</p>
                                <p className="operator-name">{user.f_name} {user.l_name}</p>
                                <p className="operator-info">{user.email}</p>
                            </Col>
                        </Row>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default OperatorName;
