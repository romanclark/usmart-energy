import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegClock, FaPause, FaPlay, FaForward } from 'react-icons/fa';


class MarketPeriodControl extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isPaused: true,
            newData: false,
            currentTime: new Date().toLocaleString()
        }

        // bind functions
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
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
        this.state.isPaused ? console.log("it was playing and you clicked pause!") : console.log("it was paused you clicked play!");
        // flip it now
        this.setState({ 
            isPaused: !this.state.isPaused,
            newData: !this.state.newData    
        });
    }

    handleSkip() {
        console.log("you clicked skip market period!");
    }

    render() {
        return (
            <div>
                <p className="simulation-title center-text"><FaRegClock size="3rem"></FaRegClock>&nbsp;Simulation Time</p>

                <Row className="center-content">
                    <Col>
                        <div className="clock center-text">{this.state.isPaused ? "PLAYING" : "PAUSED"}</div>
                    </Col>

                    <Col className="center-text">
                        <Button
                            onClick={this.handlePlayPause}
                            variant="dark"
                            className="simulation-button">
                            {this.state.isPaused ?
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
                </Row>

                <Row>
                    <Col>
                        <div className={this.state.newData ? "center-text clock new-data" : "center-text clock"}>{this.state.isPaused ? this.state.currentTime : "No time"}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MarketPeriodControl;
