import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo2 from '../../images/transparent-tower.png';

import { AuthConsumer } from "../auth/authContext";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Profile from "./Profile"

const NavigationBar = () => {
    return (
        <AuthConsumer>
            {({ authenticated }) =>
                authenticated ? (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                        <LinkContainer to="/">
                            <Navbar.Brand><img className="navbar-brand" src={logo2} width={40} alt="logo" /></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <LinkContainer to="/personal/1">
                                    <Nav.Link>Personal</Nav.Link>
                                </LinkContainer>
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
                                <LinkContainer to="/transactions/">
                                    <Nav.Link>Financial</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/about-us">
                                    <Nav.Link>About</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            <Nav>
                                <LinkContainer to="/profile">
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                                <Logout />
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                ) : (
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                            <LinkContainer to="/">
                                <Navbar.Brand><img className="navbar-brand" src={logo2} width={40} alt="logo" /></Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <LinkContainer to="/personal/1">
                                        <Nav.Link>Personal</Nav.Link>
                                    </LinkContainer>
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
                                    <LinkContainer to="/transactions/">
                                        <Nav.Link>Financial</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/about-us">
                                        <Nav.Link>About</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                <Nav>
                                    <Login />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    )
            }

        </AuthConsumer>
    )
}
export default NavigationBar;
