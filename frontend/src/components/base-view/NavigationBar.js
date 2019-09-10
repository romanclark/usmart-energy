import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import logo2 from '../../images/transparent-tower.png';

const NavigationBar = () => {
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
            <LinkContainer to="/homeowner/">
                <Nav.Link>WIP User View</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/operator/">
                <Nav.Link>WIP Operator View</Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav>
            <Button>
                Log in
            </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar;
