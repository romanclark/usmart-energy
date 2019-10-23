import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Geocode from "react-geocode"; // for use changing addr -> lat & long
import { Form, Button, Col } from 'react-bootstrap';
import CreateAccountModal from './CreateAccountModal';
import Loading from '../base-view/Loading';
import Notification from '../reuseable/Notification';

import UsersService from './UsersService';
const usersService = new UsersService();

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCOdgp6GdEi5xInKD6aR4n4XleNU-Gy3d0");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toHome: false,
            loading: true,
            firstName: null,
            lastName: null,
            email: null,
            street: null,
            city: null,
            state: null,
            zip: null,
            popupTitle: null,
            popupText: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateValues = this.populateValues.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }

    componentDidMount() {
        if (this.props.update) {
            usersService.getUser(this.props.user.id, this.props.token).then((u) => {
                this.setState({
                    firstName: u.first_name,
                    lastName: u.last_name,
                    email: u.email,
                    street: u.street,
                    city: u.city,
                    state: u.state,
                    zipcode: u.zipcode
                })
            }).then(() => {
                this.setState({ loading: false });
                this.populateValues();
            }).catch((error) => {
                console.error(error);
                // alert(error);
                this.setState({
                    popupTitle: "Error!",
                    popupText: "There was an error loading the form!",
                    loading: false
                });
                this.populateValues();
            });
        }
    }

    // It calls the corresponding UsersService.createUser() method that makes the actual API call to the backend to create a user.
    handleCreate() {
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
                        "user_id": this.props.user.id,
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
                    // var created_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    // alert(created_user + " created!");
                    this.setState({ toHome: true });
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

    // It calls the corresponding UsersService.updateUser() method that makes the actual API call to the backend to create a user.
    handleUpdate() {
        // get lat and long
        var whole_addr = this.refs.street.value + ", " + this.refs.city.value + ", " + this.refs.state.value + ", " + this.refs.zipcode.value;

        // Get latitude & longitude from address.
        Geocode.fromAddress(whole_addr).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                var fixed_lat = lat.toFixed(6);
                var fixed_lng = lng.toFixed(6);
                usersService.updateUser(
                    {
                        "user_id": this.props.user.id,
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
                    // var updated_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    // alert(updated_user + " updated!");
                    this.setState({ toHome: true });
                }).catch((error) => {
                    console.error(error);
                    this.setState({
                        popupTitle: "Error!",
                        popupText: "There was an error updating your account! Please re-check your form."
                    });
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    // method so that you have the proper functionality when a user clicks on the submit button
    handleSubmit(event) {
        event.preventDefault();
        this.props.update ? this.handleUpdate() : this.handleCreate();
    }

    populateValues() {
        this.refs.firstName.value = this.state.firstName;
        this.refs.lastName.value = this.state.lastName;
        this.refs.email.value = this.state.email;
        this.refs.street.value = this.state.street;
        this.refs.city.value = this.state.city;
        this.refs.state.value = this.state.state;
        this.refs.zipcode.value = this.state.zipcode;
    }

    handleCloseNotification() {
        this.setState({
            popupTitle: null,
            popupText: null
        });
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to={'/'} />
        }
        return (
            <div>
                {/* popup to complete creating the account */}
                {!this.props.update ?
                    <div>
                        <CreateAccountModal
                            user={this.props.user}
                            user_id={this.props.user.id}
                            token={this.props.token}>
                        </CreateAccountModal>
                    </div>
                    :
                    null
                }
                {/* updating their account */}
                <div className="container form-group">
                    {!this.props.token ? <Redirect to="/404" /> : <div></div>}
                    {this.state.loading ? (
                        <Loading type="spinner"></Loading>
                    ) : (
                            <div className="wrapper update-form">
                                {this.state.popupTitle ?
                                    <Notification
                                        title={this.state.popupTitle}
                                        message={this.state.popupText}
                                        handleCloseNotification={() => this.handleCloseNotification()}
                                        show={this.state.popupTitle}
                                        color="rgba(216,0,12,0.2)">
                                    </Notification> : null}
                                <p className="page-title">Update Your Account</p>
                                <Form onSubmit={e => this.handleSubmit(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control ref='firstName' />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control ref='lastName' />
                                        </Form.Group>
                                    </Form.Row>

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
                                                <option>Select...</option>
                                                <option>Arizona</option>
                                                <option>California</option>
                                                <option>Colorado</option>
                                                <option>Utah</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control ref='zipcode' />
                                        </Form.Group>
                                    </Form.Row>

                                    <Button className="top-margin" variant="dark" type="submit">Update</Button>
                                </Form>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default UserCreateUpdate;
