import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Form, Button, Col, Modal } from 'react-bootstrap';
import history from '../../utils/history';
import Notification from '../reuseable/Notification';
import WalkthroughModal from '../base-view/WalkthroughModal';

import UsersService from './UsersService';
const usersService = new UsersService();

class CreateAccountModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popupTitle: null,
            popupText: null,
            showWalkthrough: false
        };

        // bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.handleCloseWalkthrough = this.handleCloseWalkthrough.bind(this);
    }

    componentDidMount() {
        this.refs.email.value = this.props.user.email;
    }

    handleSubmit(event) {
        event.preventDefault();
        // get lat and long
        var whole_addr = this.refs.street.value + ", " + this.refs.city.value + ", " + this.refs.state.value + ", " + this.refs.zipcode.value;
        // Get latitude & longitude from address.
        Geocode.fromAddress(whole_addr).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                var fixed_lat = lat.toFixed(6);
                var fixed_lng = lng.toFixed(6);
                usersService.createUser(
                    {
                        "user_id": this.props.user_id,
                        "first_name": this.refs.firstName.value,
                        "last_name": this.refs.lastName.value,
                        "email": this.refs.email.value,
                        "street": this.refs.street.value,
                        "city": this.refs.city.value,
                        "state": this.refs.state.value,
                        "zipcode": this.refs.zipcode.value,
                        "latitude": fixed_lat,
                        "longitude": fixed_lng,
                    }, this.props.token
                ).then((result) => {
                    // after successful account creation, show the walkthrough
                    // handleCloseWalkthrough will reroute the user to the dashboard
                    this.setState({
                        showWalkthrough: true
                    })
                }).catch((error) => {
                    console.error(error);
                    this.setState({
                        popupTitle: "Error!",
                        popupText: "There was an error creating your account! Please re-check your form."
                    });
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    handleCloseNotification() {
        this.setState({
            popupTitle: null,
            popupText: null
        });
    }

    handleCloseWalkthrough() {
        // user account finalized, walkthrough viewed and closed
        // now we can redirect the user to the root
        history.push('/');
    }

    render() {
        return (
            <div>
                <Modal
                    show={true}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter">
                    {this.state.showWalkthrough ?
                        <WalkthroughModal
                            show={this.state.showWalkthrough}
                            handleClose={this.handleCloseWalkthrough}
                            isHomeowner={this.props.user.role === "user"}>
                        </WalkthroughModal> 
                        : null}
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">Finish Creating Your Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control ref='firstName' />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control ref='lastName' />
                                </Form.Group>
                            </Form.Row>

                            {this.state.popupTitle ?
                                <Notification
                                    title={this.state.popupTitle}
                                    message={this.state.popupText}
                                    handleCloseNotification={() => this.handleCloseNotification()}
                                    show={this.state.popupTitle}
                                    color="rgba(216,0,12,0.2)">
                                </Notification> : null}

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref='email' />
                            </Form.Group>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control ref='street' />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control ref='city' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" ref='state'>
                                        <option>Utah</option>
                                        <option>Arizona</option>
                                        <option>California</option>
                                        <option>Colorado</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control ref='zipcode' />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="outline-secondary" type="submit">Create</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default CreateAccountModal;
