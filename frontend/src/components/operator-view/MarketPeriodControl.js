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
            currentTime: null,
            loadingTime: true
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
        // Grab market time on page load
        var self = this;
        transactionsService.getMarketTime(self.props.token).then(function (result) {
            self.setState({
                currentTime: new Date(result).toLocaleString(),
                loadingTime: false
            })
        });
        transactionsService.isMarketRunning(self.props.token).then(function (result) {
            self.setState({
                isPaused: !result
            })
        });
        // Every second, increase clock by 4 minutes if simulation is paused
        setInterval(function () {
            if (this._isMounted) {
                if (!this.state.isPaused) {
                    var newTime = new Date(this.state.currentTime)
                    newTime.setMinutes(newTime.getMinutes() + 4)
                    this.setState({
                        currentTime: newTime.toLocaleString()
                    })
                }
            }
        }.bind(this), 1000);

        // Every 30 seconds, correct market time discrepancies by pausing and playing
        setInterval(function () {
            if (this._isMounted) {
                if (!this.state.isPaused) {
                    self.setState({
                        loadingTime: true
                    });
                    transactionsService.controlMarketplace("pause", self.props.token).then(function () {
                        transactionsService.controlMarketplace("play", self.props.token).then(function (result) {
                            self.setState({
                                currentTime: new Date(result).toLocaleString(),
                                loadingTime: false
                            })
                        })
                    });
                }
            }
        }.bind(this), 30000);
    }

    componentWillUnmount() {
        this._isMounted = false;
        return !this.state.currentTime;
    }

    handlePlayPause() {
        var self = this;
        self.setState({
            loadingTime: true
        });
        this.state.isPaused ? transactionsService.controlMarketplace("play", self.props.token).then(function (result) {
            self.setState({
                currentTime: new Date(result).toLocaleString(),
                //isPaused: !self.state.isPaused,
                loadingTime: false
            })
        })
            : transactionsService.controlMarketplace("pause", self.props.token).then(function (result) {
                self.setState({
                    currentTime: new Date(result).toLocaleString(),
                    //isPaused: !self.state.isPaused,
                    loadingTime: false
                })
            });

        // flip it now
        this.setState({
            isPaused: !this.state.isPaused,
        });
    }

    handleSkip() {
        var self = this;
        self.setState({
            loadingTime: true
        });
        transactionsService.controlMarketplace("skip", self.props.token).then((result) => {
            self.setState({
                currentTime: new Date(result).toLocaleString(),
                loadingTime: false
            })
        });;
    }

    handleReset() {
        var self = this;
        self.setState({
            loadingTime: true
        });
        transactionsService.controlMarketplace("reset", self.props.token).then((result) => {
            self.setState({
                currentTime: new Date(result).toLocaleString(),
                isPaused: true,
                loadingTime: false
            })
        });;
    }

    render() {
        return (
            <div>
                <p className="simulation-title center-text"><FaRegClock size="5vmin"></FaRegClock>&nbsp;Simulation Time</p>
                <div>
                    <Row>
                        <Col className="center-content">
                            <Button
                                onClick={this.handleReset}
                                variant="secondary">
                                <FaRedo className="icon" size="4vmin"></FaRedo>
                                <div className="control-button-text">Reset</div>
                            </Button>
                        </Col>

                        <Col className="center-text">
                            <Button
                                onClick={this.handlePlayPause}
                                variant={this.state.isPaused ? "success" : "danger"}
                                className="play-pause-button">
                                {this.state.isPaused ?
                                    (
                                        <div className="center-text">
                                            <FaPlay className="icon" size="4vmin"></FaPlay>
                                            <div className="control-button-text">Play</div>
                                        </div>
                                    ) : (
                                        <div className="center-text">
                                            <FaPause className="icon" size="4vmin"></FaPause>
                                            <div className="control-button-text">Pause</div>
                                        </div>
                                    )}
                            </Button>
                        </Col>

                        <Col className="center-content">
                            <Button
                                onClick={this.handleSkip}
                                variant="secondary">
                                <FaForward className="icon" size="4vmin"></FaForward>
                                <div className="control-button-text">Next period</div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.isPaused ?
                                <div className="center-text stopped">Stopped</div>
                                :
                                <div>
                                    {this.state.loadingTime ?
                                        <div className="center-text not-clock">Syncing...</div>
                                        :
                                        <div className="center-text clock">{this.state.currentTime}</div>
                                    }
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default MarketPeriodControl;
