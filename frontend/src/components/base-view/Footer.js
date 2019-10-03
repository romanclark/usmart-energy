import React from "react";
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => (
    <footer className="bg-dark p-3 text-center footer-container">
        <p className="footer-text">Electric Avenue & USmart Energy Lab</p>
        <LinkContainer to="/about-us">
            <Button variant="outline-secondary">
                About the project
            </Button>
        </LinkContainer>
    </footer>
)

export default Footer;
