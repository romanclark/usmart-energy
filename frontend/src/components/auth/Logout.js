import React from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Can from '../auth/Can';
import { AuthConsumer } from './authContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => (
    <AuthConsumer>
        {({ logout, user }) => (
            <NavDropdown alignRight={true} drop="down" title="Profile Options">
                {/* <Can
                    role={user.role}
                    perform="operator-pages:visit"
                    yes={() => (
                        <LinkContainer to="/operator/">
                            <NavDropdown.Item className="drop-item">Dashboard</NavDropdown.Item>
                        </LinkContainer>
                    )}
                /> */}
                {/* <Can
                    role={user.role}
                    perform="profile-page:visit"
                    yes={() => (
                        <LinkContainer to="/profile/">
                            <NavDropdown.Item className="drop-item">User Info</NavDropdown.Item>
                        </LinkContainer>
                    )}
                /> */}
                <Can
                    role={user.role}
                    perform="home-page:visit"
                    yes={() => (
                        <LinkContainer to="/about-us/">
                            <NavDropdown.Item className="drop-item">About Project</NavDropdown.Item>
                        </LinkContainer>
                    )}
                />
                <NavDropdown.Item className="center-text drop-button"><Button onClick={logout} variant="secondary">Logout&nbsp;<FaSignOutAlt /></Button></NavDropdown.Item>
            </NavDropdown>
        )}
    </AuthConsumer>
);

export default Logout;