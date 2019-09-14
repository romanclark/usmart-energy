import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo2 from '../../images/transparent-tower.png';

import { AuthConsumer } from "../auth/authContext";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Can from "../auth/Can"

const NavigationBar = () => {
    return (
        <AuthConsumer>
            {({ user }) => (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                    <LinkContainer to="/">
                        <Navbar.Brand><img className="navbar-brand" src={logo2} width={40} alt="logo" /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Can
                                role={user.role}
                                perform="user-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/personal/1">
                                        <Nav.Link>Personal</Nav.Link>
                                    </LinkContainer>
                                )}
                                no={() => (
                                    <LinkContainer to="/">
                                        <Nav.Link>Home</Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            <Can
                                role={user.role}
                                perform="admin-pages:visit"
                                yes={() => (
                                    <NavDropdown title="System Distributor" id="collasible-nav-dropdown">
                                        <LinkContainer to="/distributor/">
                                            <NavDropdown.Item>Overview</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/users/">
                                            <NavDropdown.Item>All Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/assets/">
                                            <NavDropdown.Item>All Assets</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            />
                            <Can
                                role={user.role}
                                perform="finance-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/transactions/">
                                        <Nav.Link>Financial</Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            <LinkContainer to="/about-us">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
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
