import React from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Can from '../auth/Can';
import { AuthConsumer } from './authContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => (
    <AuthConsumer>
        {({ logout, user }) => (
            <NavDropdown alignRight={true} drop="down" title="Profile">
                <Can
                    role={user.role}
                    perform="homeowner-pages:visit"
                    yes={() => (
                        <LinkContainer to="/homeowner/">
                            <NavDropdown.Item className="drop-item">Homeowner Dashboard</NavDropdown.Item>
                        </LinkContainer>
                    )}
                />
                <Can
                    role={user.role}
                    perform="operator-pages:visit"
                    yes={() => (
                        <LinkContainer to="/operator/">
                            <NavDropdown.Item className="drop-item">Operator Dashboard</NavDropdown.Item>
                        </LinkContainer>
                    )}
                />
                <LinkContainer to="/updateuser/">
                    <NavDropdown.Item className="drop-item">Edit Account</NavDropdown.Item>
                </LinkContainer>
                <Can
                    role={user.role}
                    perform="home-page:visit"
                    yes={() => (
                        <LinkContainer to="/about-us/">
                            <NavDropdown.Item className="drop-item">About</NavDropdown.Item>
                        </LinkContainer>
                    )}
                />
                <NavDropdown.Item className="center-text drop-button"><Button onClick={logout} variant="secondary">Logout&nbsp;<FaSignOutAlt /></Button></NavDropdown.Item>
            </NavDropdown>
        )}
    </AuthConsumer>
);

export default Logout;