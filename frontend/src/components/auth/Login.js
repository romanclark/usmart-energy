import React from "react";

import { Button } from 'react-bootstrap';
import { AuthConsumer } from "./authContext";
import { FaUser } from 'react-icons/fa';

const Login = () => (
    <AuthConsumer>
        {({ initiateLogin }) => (
            <Button onClick={initiateLogin} variant="outline-secondary">
                <FaUser/> Log in
            </Button>
        )}
    </AuthConsumer>
);

export default Login;