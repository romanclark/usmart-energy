import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegClock, FaPause, FaPlay, FaForward } from 'react-icons/fa';


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

    componentDidMount() {
        this._isMounted = true;
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
        // flip it now
        this.setState({ isPause: !this.state.isPause });
    }

    handleSkip() {
        console.log("you clicked skip market period!");
    }

    render() {
        // TODO have it show the current market period and change color when a new one occurs
        return (
            <div>
                <p className="simulation-title center-text"><FaRegClock size="3rem"></FaRegClock>&nbsp;Simulation Time</p>

                <Row>
                    <Col>
                        {/* a hacky way to center the buttons */}
                    </Col>

                    <Col className="center-text">
                        <Button
                            onClick={this.handlePlayPause}
                            variant="dark"
                            className="simulation-button">
                            {this.state.isPause ?
                                (
                                    <div className="center-text">
                                        <FaPause className="icon" size="1.25rem"></FaPause>
                                        <div>Pause</div>
                                    </div>
                                ) : (
                                    <div className="center-text">
                                        <FaPlay className="icon" size="1.25rem"></FaPlay>
                                        <div>Play</div>
                                    </div>
                                )}
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            onClick={this.handleSkip}
                            variant="dark"
                            className="center-text">
                            <FaForward className="icon" size="1.5rem"></FaForward>
                            <div>Jump to next</div>
                        </Button>
                    </Col>

                    <Col>
                        {/* a hacky way to center the buttons */}
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