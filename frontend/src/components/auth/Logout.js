import React from "react";

import { Button } from 'react-bootstrap';
import { AuthConsumer } from "./authContext";
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => (
    <AuthConsumer>
        {({ logout }) => (
            <Button onClick={logout}>
                Logout&nbsp;<FaSignOutAlt/>
            </Button>
        )}
    </AuthConsumer>
);

export default Logout;