import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Geocode from "react-geocode"; // for use changing addr -> lat & long
import { Form, Button, Col } from 'react-bootstrap';
import CreateAccountModal from './CreateAccountModal';

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
            toHome: false
        }
        // bind the newly added handleSubmit() method to this so you can access it in your form:
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.update) {
            usersService.getUser(this.props.user.id, this.props.token).then((u) => {
                this.refs.firstName.value = u.first_name;
                this.refs.lastName.value = u.last_name;
                this.refs.email.value = u.email;
                this.refs.street.value = u.street;
                this.refs.city.value = u.city;
                this.refs.state.value = u.state;
                this.refs.zipcode.value = u.zipcode;
            }).then(() => {
                // successfully found this user, so we're updating them
                this.setState({ update: true });
            }).catch((error) => {
                console.error(error);
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
                    var updated_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    alert(updated_user + " created!");
                    this.setState({ toHome: true });
                }).catch(() => {
                    alert('There was an error! Please re-check your form.');
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
                    var updated_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    alert(updated_user + " updated!");
                    this.setState({ toHome: true });
                }).catch(() => {
                    alert('There was an error! Please re-check your form.');
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
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <p className="page-title">Update Your Account</p>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>First name</Form.Label>
                                <Form.Control placeholder="First name" ref='firstName' />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control placeholder="Last name" ref='lastName' />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email" ref='email' />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" ref='street' />
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

                        <Button variant="outline-secondary" type="submit">
                            Submit
                    </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UserCreateUpdate;
