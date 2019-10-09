import React, { Component } from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { AuthConsumer } from '../auth/authContext';
import { FaExclamationTriangle, FaUser } from 'react-icons/fa';

class Error404 extends Component {
    render() {
        return (
            <AuthConsumer>
                {({ initiateLogin }) => (
                    <div className="error-container">
                        {!this.props.token ?
                            <div className="wrapper">
                                <p className="page-title center-text">404</p>
                                <p className="error"><FaExclamationTriangle className="icon" size="1.5rem"></FaExclamationTriangle> You don't have access here!</p>
                                <NavDropdown.Item className="center-text drop-button"><Button onClick={initiateLogin} variant="secondary"><FaUser />&nbsp;Login or Signup</Button></NavDropdown.Item>
                            </div> : null
                        }
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default Error404;
