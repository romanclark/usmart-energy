import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPause, FaPlay, FaForward } from 'react-icons/fa';


class MarketPeriodControl extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        // bind functions
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

        // set up state
        this.state = {
            // TODO this is pulling in current time, but we'll want to get the "simulation time" from the backend, do conditional styling for if it's still computing simulation?
            currentTime: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        // var self = this;
    }

    componentWillMount() {
        setInterval(function () {
            if (this._isMounted) {
                this.setState({
                    currentTime: new Date().toLocaleString()
                })
            }
        }.bind(this), 1000);
    }

    componentWillUnmount() {
        this._isMounted = false;
        return !this.state.currentTime;
    }

    handlePause() {
        console.log("you clicked pause!");
        // var self = this;
        // TODO add API call
    }

    handlePlay() {
        console.log("you clicked play!");
        // var self = this;
        // TODO add API call
    }

    handleSkip() {
        console.log("you clicked skip market period!");
        // var self = this;
        // TODO add API call
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">"Real-Time" Simulation Clock</p>
                <Row>
                    <Col className="center-text">
                        <Button onClick={this.handlePause}
                            className="simulation-button">
                            <FaPause className="icon" size="2rem"></FaPause>
                            <div>Pause</div>
                        </Button>
                    </Col>
                    <Col className="center-text">
                        <Button onClick={this.handlePlay}
                            className="simulation-button">
                            <FaPlay className="icon" size="2rem"></FaPlay>
                            <div>Play</div>
                        </Button>
                    </Col>
                    <Col className="center-text">
                        <Button onClick={this.handleSkip}>
                            <FaForward className="icon" size="2rem"></FaForward>
                            <div>Jump to next</div>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="center-text">
                        {/* TODO conditional coloring to show that it's performing the simulation? */}
                        <div className="clock">{this.state.currentTime}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MarketPeriodControl;