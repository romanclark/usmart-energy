import React from "react";
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => (
    <footer className="bg-dark p-3 text-center">
        <p className="footer-text">Electric Avenue & USmart Energy Lab</p>
        <LinkContainer to="/about-us">
            <Button variant="outline-secondary">
                <a>About the project</a>
            </Button>
        </LinkContainer>
    </footer>
)

export default Footer;
