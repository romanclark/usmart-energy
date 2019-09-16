import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaChartLine } from 'react-icons/fa';

import { Navbar, Nav } from 'react-bootstrap';
import bolt from '../../images/bolt.png';

import { AuthConsumer } from "../auth/authContext";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Can from "../auth/Can"

const NavigationBar = () => {
    return (
        <AuthConsumer>
            {({ user }) => (
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
                    <LinkContainer to="/about-us">
                        <Navbar.Brand><img className="navbar-brand" src={bolt} width={30} alt="bolt" /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Can
                                role={user.role}
                                perform="user-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/homeowner/">
                                        <Nav.Link><FaHome className="icon" size="1.5rem"></FaHome> Homeowner</Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            <Can
                                role={user.role}
                                perform="admin-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/operator/">
                                        <Nav.Link><FaChartLine className="icon" size="1.5rem"></FaChartLine> Operator</Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                        </Nav>
                        <Nav>
                            <Can
                                role={user.role}
                                perform="profile-page:visit"
                                yes={() => (
                                    <LinkContainer to="/profile">
                                        <Nav.Link>Profile</Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            <Can
                                role={user.role}
                                perform="users:getSelf"
                                yes={() => (
                                    <Logout />
                                )}
                                no={() => <Login />}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </AuthConsumer>
    )
}
export default NavigationBar;
