import React from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { AuthConsumer } from './authContext';
import { FaUser } from 'react-icons/fa';

const Login = () => (
    <AuthConsumer>
        {({ initiateLogin }) => (
            <NavDropdown alignRight={true} drop="down" title="Login or Signup">
                <NavDropdown.Item className="drop-item" href="/about-us">About Project</NavDropdown.Item>
                <NavDropdown.Item className="center-text drop-button"><Button onClick={initiateLogin} variant="secondary"><FaUser />&nbsp;Login or Signup</Button></NavDropdown.Item>
            </NavDropdown>
        )}
    </AuthConsumer>
);

export default Login;