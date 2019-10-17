import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegClock, FaPause, FaPlay, FaForward, FaRedo } from 'react-icons/fa';
import TransactionsService from './TransactionsService';
const transactionsService = new TransactionsService();

class MarketPeriodControl extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isPaused: true,
            newData: false,
            currentTime: null
        }

        // bind functions
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillMount() {
        // Get current time every second
        /*
        setInterval(function () {
            if (this._isMounted) {
                this.setState({
                    currentTime: new Date().toLocaleString()
                })
            }
        }.bind(this), 1000);
        */

        var self = this;
        transactionsService.getMarketTime(self.props.token).then(function (result) {
            self.setState({ 
                currentTime: result
            })
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        return !this.state.currentTime;
    }

    handlePlayPause() {
        var self = this;
        this.state.isPaused ? transactionsService.controlMarketplace("play", self.props.token).then(function (result) {
            self.setState({ 
                currentTime: result
            })
        }) 
        : transactionsService.controlMarketplace("pause", self.props.token).then(function (result) {
            self.setState({ 
                currentTime: result
            })
        }); 

        // flip it now
        this.setState({ 
            isPaused: !this.state.isPaused,
            newData: !this.state.newData    
        });
    }

    handleSkip() {
        var self = this;
        transactionsService.controlMarketplace("skip", self.props.token).then((result) => {
            self.setState({ currentTime: result })
        });;
    }

    handleReset() {
        var self = this;
        transactionsService.controlMarketplace("reset", self.props.token).then((result) => {
            self.setState({ currentTime: result, isPaused: true })
        });; 
    }

    render() {
        return (
            <div>
                <p className="simulation-title center-text"><FaRegClock size="3rem"></FaRegClock>&nbsp;Simulation Time</p>

                <Row className="center-content">
                    <Col>
                        <div className="clock center-text">{this.state.isPaused ? "PAUSED" : "PLAYING"}</div>
                    </Col>

                    <Col className="center-text">
                        <Button
                            onClick={this.handlePlayPause}
                            variant="dark"
                            className="simulation-button">
                            {this.state.isPaused ?
                                (
                                    <div className="center-text">
                                    <FaPlay className="icon" size="1.25rem"></FaPlay>
                                    <div>Play</div>
                                    </div> 
                                ) : (
                                    <div className="center-text">
                                    <FaPause className="icon" size="1.25rem"></FaPause>
                                    <div>Pause</div>
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
                        <Button
                            onClick={this.handleReset}
                            variant="dark"
                            className="center-text">
                            <FaRedo className="icon" size="1.5rem"></FaRedo>
                            <div>Reset</div>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className={this.state.newData ? "center-text clock new-data" : "center-text clock"}>{this.state.currentTime}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MarketPeriodControl;