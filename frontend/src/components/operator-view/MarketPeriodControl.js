import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPause, FaPlay, FaTrafficLight, FaFastForward } from 'react-icons/fa';


class MarketPeriodControl extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);

        // set up state
        this.state = {
            // TODO this is pulling in current time, but we'll want to get the "simulation time" from the backend
            currentTime: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        // var self = this;
    }

    componentWillMount() {
        setInterval(function () {
            this.setState({
                currentTime: new Date().toLocaleString()
            })
        }.bind(this), 1000);
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

    handleSlowDown() {
        console.log("you clicked slow down!");
        // var self = this;
        // TODO add API call
    }

    handleFastForward() {
        console.log("you clicked fast forward!");
        // var self = this;
        // TODO add API call
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Usmart Simulation Controls</p>
                <Row>
                    <Col className="placeholder-wrapper">
                        <Button onClick={this.handlePause}>
                            <FaPause className="icon" size="2rem"></FaPause>
                            <div>Pause</div>
                        </Button>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <Button onClick={this.handlePlay}>
                            <FaPlay className="icon" size="2rem"></FaPlay>
                            <div>Play</div>
                        </Button>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <Button onClick={this.handleSlowDown}>
                            <FaTrafficLight className="icon" size="2rem"></FaTrafficLight>
                            <div>Slow</div>
                        </Button>
                    </Col>
                    <Col className="placeholder-wrapper">
                        <Button onClick={this.handleFastForward}>
                            <FaFastForward className="icon" size="2rem"></FaFastForward>
                            <div>Jump</div>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="placeholder-wrapper">
                        {/* TODO conditional coloring to show that it's performing the simulation? */}
                        <div className="placeholder-wrapper page-subtitle">{this.state.currentTime}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MarketPeriodControl;