import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import logo2 from '../images/transparent-tower.png';
import '../App.css';

const NavigationBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/"><img className="navbar-brand" src={logo2} width={40} alt="logo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/personal/1">Personal</Nav.Link>
          <NavDropdown title="System Distributor" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/distributor/">Overview</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/users/">All Users</NavDropdown.Item>
            <NavDropdown.Item href="/assets/">All Assets</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/transactions/">Financial</Nav.Link>
          <Nav.Link href="/about-us">About</Nav.Link>
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
               <Nav.Link href="/profile">Profile</Nav.Link>
            )}

            {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavigationBar;