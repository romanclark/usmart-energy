import React, { Component } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import bolt from '../../images/bolt.png';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: true
        }
    }

    handleClose() {
        this.setState({ show: false })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={6}>
                        <Toast
                            onClose={this.handleClose}
                            show={this.state.show}
                            delay={5000}
                            autohide
                            style={{
                                position: 'absolute',
                                top: -200,
                                right: -175,
                            }}>
                            <Toast.Header>
                                <img
                                    src={bolt}
                                    width={15}
                                    className="rounded mr-2"
                                    alt="bolt"
                                />
                                <strong className="mr-auto">{this.props.title}</strong>
                                <small>now</small>
                            </Toast.Header>
                            <Toast.Body>{this.props.message}</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Notification;
