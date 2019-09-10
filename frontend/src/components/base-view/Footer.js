import React from "react";
import { Button } from 'react-bootstrap';

const Footer = () => (
    <footer className="bg-dark p-3 text-center">
            <p className="footer-text">Electric Avenue & USmart Energy Lab</p>
            <Button>
                <a href="/about-us" className="footer-text">About the project</a>
            </Button>
    </footer>
)

export default Footer;
