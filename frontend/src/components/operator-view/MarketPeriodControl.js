import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPause, FaPlay, FaForward } from 'react-icons/fa';


class MarketPeriodControl extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isPause: true
        }

        // bind functions
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleSkip = this.handleSkip.bind(this);

        // set up state
        this.state = {
            // TODO this is pulling in current time, but we'll want to get the "simulation time" from the backend, do conditional styling for if it's still computing simulation?
            currentTime: new Date().toLocaleString()
        };
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

    handlePlayPause() {
        this.state.isPause ? console.log("you clicked pause!") : console.log("you clicked play!");
        // var self = this;
        // TODO add API call

        // flip it now
        this.setState({ isPause: !this.state.isPause });
    }

    handleSkip() {
        console.log("you clicked skip market period!");
        // var self = this;
        // TODO add API call
    }

    render() {
        return (
            <div>
                <p className="page-subtitle center-text">"Real-Time" Simulation Clock</p>
                <Row>
                    <Col>

                    </Col>
                    <Col className="center-text">
                        <Button
                            onClick={this.handlePlayPause}
                            className="simulation-button">
                            {this.state.isPause ?
                                (
                                    <div className="center-text">
                                        <FaPause className="icon" size="2rem"></FaPause>
                                        <div>Pause</div>
                                    </div>
                                ) : (
                                    <div className="center-text">
                                        <FaPlay className="icon" size="2rem"></FaPlay>
                                        <div>Play</div>
                                    </div>
                                )}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={this.handleSkip}
                            className="center-text">
                            <FaForward className="icon" size="2rem"></FaForward>
                            <div>Jump to next</div>
                        </Button>
                    </Col>
                    <Col>

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