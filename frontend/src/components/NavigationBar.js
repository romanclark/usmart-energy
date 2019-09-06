import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import logo2 from '../images/transparent-tower.png';
import '../App.css';

const NavigationBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

    return (
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
            {!isAuthenticated && (
                <Button
                onClick={() =>
                    loginWithRedirect({})
                }
                >
                Log in
                </Button>
            )}

            {isAuthenticated && (
              <LinkContainer to="/profile">
                <Nav.Link>{user.name}</Nav.Link>
              </LinkContainer>
            )}

            {isAuthenticated && <Button onClick={() => logoutWithRedirect()}>Log out</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar;