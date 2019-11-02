import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";
import { FaChartLine } from 'react-icons/fa';

import UsersService from '../user-view/UsersService';
const usersService = new UsersService();

class OperatorName extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: null,
            first_name: null,
            last_name: null
        };
    }

    componentDidMount() {
        if (!this.props.user.f_name) {
            var self = this;
            usersService.getUser(this.props.user.id, this.props.token).then((result) => {
                self.setState({
                    user_id: result.user_id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                })
            })
        }
    }

    render() {
        return (
            <AuthConsumer>
                {({ user }) => (
                    <div>
                        <Row>
                            <Col sm="3">
                                <img className="rounded-circle img-fluid profile-picture mb-3 mb-md-0" src={user.picture} alt="user" />
                            </Col>
                            <Col className="operator-fields">
                                <p className="dashboard-type operator-info"><FaChartLine className="icon" size="2rem"></FaChartLine>&nbsp;Operator Dashboard</p>
                                {this.props.user.f_name ?
                                    <p className="name">{user.f_name} {user.l_name}</p>
                                    :
                                    <p className="name">{this.state.first_name} {this.state.last_name}</p>
                                }
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
