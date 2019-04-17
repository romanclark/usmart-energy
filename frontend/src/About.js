import React, { Component } from 'react';


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPageURL: ''
        };
    }
    render() {

        return (
            <div className="distributor">
                <h1>About Us</h1>
                <p>This dashboard was created to envision the results of a democratized energy future being developed at the U-Smart: Utah Smart Energy Lab at the Department of Electrical and Computer Engineering at the University of Utah. By adding flexibility to energy demand and distribution, the Utah Smart Energy Lab seeks to design the next generation of resilient and sustainable power and energy systems.</p>
                <p>This project is led by Dr. Masood Parvania and Alex Palomino in the Utah Smart Energy Lab. This dashboard and underlying technologies were built by Roman Clark, Jared Hansen, Jason Hansen, and Parker Stewart at the School of Computing at the University of Utah.</p>
            </div>
        );
    }

}

export default About;