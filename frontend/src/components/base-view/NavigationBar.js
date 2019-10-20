import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav } from 'react-bootstrap';
import bolt from '../../images/bolt.png';

import { AuthConsumer } from "../auth/authContext";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Can from "../auth/Can";

const NavigationBar = () => {
    return (
        <AuthConsumer>
            {({ user }) => (
                <Navbar expand="sm" bg="dark" variant="dark" fixed="top">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Can
                                role={user.role}
                                perform="homeowner-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/homeowner/">
                                        <Nav.Link><div className="viga"><Navbar.Brand>Electric Avenue &nbsp;<img className="navbar-brand bolt" src={bolt} width={25} alt="bolt" />USmart Energy</Navbar.Brand></div></Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            <Can
                                role={user.role}
                                perform="operator-pages:visit"
                                yes={() => (
                                    <LinkContainer to="/operator/">
                                        <Nav.Link><div className="viga"><Navbar.Brand>Electric Avenue &nbsp;<img className="navbar-brand bolt" src={bolt} width={25} alt="bolt" />USmart Energy</Navbar.Brand></div></Nav.Link>
                                    </LinkContainer>
                                )}
                            />
                            {user.role === "visitor" ? <div className="viga"><Navbar.Brand>Electric Avenue &nbsp;<img className="navbar-brand bolt" src={bolt} width={25} alt="bolt" />USmart Energy</Navbar.Brand></div> : null}
                        </Nav>
                        <Nav>
                            <Can
                                role={user.role}
                                perform="users:getSelf"
                                yes={() => <Logout />}
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
