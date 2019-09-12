import React from "react";

import { Button } from 'react-bootstrap';
import { AuthConsumer } from "./authContext";

const Login = () => (
    <AuthConsumer>
        {({ initiateLogin }) => (
            <Button onClick={initiateLogin}>
                Log in
            </Button>
        )}
    </AuthConsumer>
);

export default Login;