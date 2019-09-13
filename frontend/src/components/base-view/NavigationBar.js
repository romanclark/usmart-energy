import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, Button } from 'react-bootstrap';
// import logo2 from '../../images/transparent-tower.png';
import bolt from '../../images/bolt.png';

const NavigationBar = () => {
    return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
    <LinkContainer to="/about-us">
        <Navbar.Brand><img className="navbar-brand" src={bolt} width={40} alt="logo" /></Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <LinkContainer to="/personal/1">
                <Nav.Link>Personal</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/homeowner/1">
                <Nav.Link>WIP Homeowner View</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/operator/">
                <Nav.Link>WIP Operator View</Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav>
            <Button>
                <a href="/login">Login</a>
            </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar;
