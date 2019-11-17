import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegClock, FaPause, FaPlay, FaForward, FaRedo } from 'react-icons/fa';

import TransactionsService from './TransactionsService';
import { SECONDS_PER_MARKET_PERIOD } from '../../system_config';
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
        this.playClock = this.playClock.bind(this);
        this.pauseClock = this.pauseClock.bind(this);
        this.skipClock = this.skipClock.bind(this);
        this.resetClock = this.resetClock.bind(this);

    }

    playClock(){
        var self = this;
        this.setState({
            isPaused: false,
            currentTime: this.state.currentTime 
        });
        this.timer = setInterval(() => {
            var newTime = self.state.currentTime
            newTime.setMinutes(newTime.getMinutes() + (60/SECONDS_PER_MARKET_PERIOD))
            if (newTime.getMinutes() === 0) {
                transactionsService.runMarketplace(self.formatMarketTime(newTime), self.props.token);
            }
            self.setState({
                currentTime: newTime
            })   
        }, 1000);
    }
    
    pauseClock(){
        this.setState({isPaused: true})
        clearInterval(this.timer)
    }

    skipClock(){
        clearInterval(this.timer)
        var self = this;
        self.setState({
            loadingTime: true
        })
        var newTime = self.state.currentTime
        newTime.setHours(newTime.getHours() + 1)
        newTime.setMinutes(0,0,0);
        transactionsService.runMarketplace(self.formatMarketTime(newTime), self.props.token).then(function (result) {
            if (!self.state.isPaused) {
                self.playClock()
            }
            self.setState({
                loadingTime: false,
                currentTime: newTime
            })
        });
    }

    resetClock(){
        var self = this;
        self.setState({
            loadingTime: true
        })
        transactionsService.resetMarketplace("", self.props.token).then(function (result) {
            var today = new Date();
            today.setHours(0,0,0,0);
            self.setState({
                loadingTime: false,
                currentTime: today
            })
        });
    }

    formatMarketTime(date){
        var d = new Date(date),
            month = '' + (d.getMonth()+1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minute = '' +  d.getMinutes(),
            second = '' + d.getSeconds()
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (day.length < 2) 
            day = '0' + day;
        if (hour.length < 2) 
            hour = '0' + hour;
        if (minute.length < 2) 
            minute= '0' + minute;
        if (second.length < 2) 
            second = '0' + second;
    
        return [year, month, day, hour, minute, second].join('-');
    }


    componentDidMount() {
        this._isMounted = true;
    }

    componentWillMount() {
        // Grab market time on page load
        var self = this;
        transactionsService.getMarketTime(self.props.token).then(function (result) {
            self.setState({
                currentTime: new Date(result),
                loadingTime: false
            })
        });
    }
        

    componentWillUnmount() {
        this._isMounted = false;
        return !this.state.currentTime;
    }


    render() {
        return (
            <div>
                <p className="simulation-title center-text"><FaRegClock size="5vmin"></FaRegClock>&nbsp;Simulation Time</p>
                <div>
                    <Row>
                        <Col className="center-content">
                            <Button
                                disabled={this.state.loadingTime}
                                onClick={this.resetClock}
                                variant="secondary"
                                className="button-width">
                                <FaRedo className="icon" size="3.75vmin"></FaRedo>
                                <div className="control-button-text">Reset</div>
                            </Button>
                        </Col>

                        <Col className="center-text">
                            <Button
                                disabled={this.state.loadingTime}
                                onClick = {this.state.isPaused ? this.playClock : this.pauseClock}
                                variant={this.state.isPaused ? "success" : "danger"}
                                className="button-width">
                                {this.state.isPaused ?
                                    (
                                        <div className="center-text">
                                            <FaPlay className="icon" size="3.75vmin"></FaPlay>
                                            <div className="control-button-text">Play</div>
                                        </div>
                                    ) : (
                                        <div className="center-text">
                                            <FaPause className="icon" size="3.75vmin"></FaPause>
                                            <div className="control-button-text">Pause</div>
                                        </div>
                                    )}
                            </Button>
                        </Col>

                        <Col className="center-content">
                            <Button
                                disabled={this.state.loadingTime}
                                onClick={this.skipClock}
                                variant="secondary">
                                <FaForward className="icon" size="3.75vmin"></FaForward>
                                <div className="control-button-text">Next period</div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.loadingTime ?
                                <div className="center-text stopped">Loading...</div>
                                :
                                <div>
                                    {this.state.isPaused ?
                                        <div className="center-text stopped">{this.state.currentTime.toLocaleString()}</div>
                                        :
                                        <div className="center-text clock">{this.state.currentTime.toLocaleString()}</div>
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
