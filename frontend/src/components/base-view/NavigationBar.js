import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaChartLine, FaUser } from 'react-icons/fa';

import { Navbar, Nav, Button } from 'react-bootstrap';
import bolt from '../../images/bolt.png';

const NavigationBar = () => {
    return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
    <LinkContainer to="/about-us">
        <Navbar.Brand><img className="navbar-brand" src={bolt} width={30} alt="bolt" /></Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <LinkContainer to="/homeowner/1">
                <Nav.Link><FaHome className="icon" size="1.5rem"></FaHome> Homeowner</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/operator/">
                <Nav.Link><FaChartLine className="icon" size="1.5rem"></FaChartLine> Operator</Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav>
            <Button variant="outline-secondary">
                <a href="/login"><FaUser/> Login</a>
            </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar;
