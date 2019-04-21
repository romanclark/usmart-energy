import React, { Component } from 'react';
import UsersService from './UsersService';
import Geocode from "react-geocode"; // for use changing addr -> lat & long

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

const usersService = new UsersService();

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCOdgp6GdEi5xInKD6aR4n4XleNU-Gy3d0");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);

        // bind the newly added handleSubmit() method to this so you can access it in your form:
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // If the the user visits a user/:user_id route, we want to fill the form with information related to the user using the primary key from the URL
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.user_id) {
            usersService.getUser(params.user_id).then((u) => {
                this.refs.firstName.value = u.first_name;
                this.refs.lastName.value = u.last_name;
                this.refs.email.value = u.email;
                this.refs.street.value = u.street;
                this.refs.city.value = u.city;
                this.refs.state.value = u.state;
                this.refs.zipcode.value = u.zipcode;
            })
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
                console.log(lat, lng);
                usersService.createUser(
                    {
                        "first_name": this.refs.firstName.value,
                        "last_name": this.refs.lastName.value,
                        "email": this.refs.email.value,
                        "street": this.refs.street.value,
                        "city": this.refs.city.value,
                        "state": this.refs.state.value,
                        "zipcode": this.refs.zipcode.value,
                        "latitude": fixed_lat,
                        "longitude": fixed_lng,
                    }
                ).then((result) => {
                    console.log(result);
                    var updated_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    alert(updated_user + " created!");
                    window.location.href = "/users/";
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
    handleUpdate(user_id) {
        // get lat and long
        var whole_addr = this.refs.street.value + ", " + this.refs.city.value + ", " + this.refs.state.value + ", " + this.refs.zipcode.value;
        
        // Get latitude & longitude from address.
        Geocode.fromAddress(whole_addr).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                var fixed_lat = lat.toFixed(6);
                var fixed_lng = lng.toFixed(6);
                console.log(lat, lng);
                usersService.updateUser(
                    {
                        "user_id": user_id,
                        "first_name": this.refs.firstName.value,
                        "last_name": this.refs.lastName.value,
                        "email": this.refs.email.value,
                        "street": this.refs.street.value,
                        "city": this.refs.city.value,
                        "state": this.refs.state.value,
                        "zipcode": this.refs.zipcode.value,
                        "latitude": fixed_lat,
                        "longitude": fixed_lng,
                    }
                ).then((result) => {
                    console.log(result);
                    var updated_user = this.refs.firstName.value + " " + this.refs.lastName.value;
                    alert(updated_user + " updated!");
                    window.location.href = "/personal/" + user_id;
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
        const { match: { params } } = this.props;

        if (params && params.user_id) {
            this.handleUpdate(params.user_id);
        }
        else {
            this.handleCreate();
        }

        event.preventDefault();
    }

    render() {
        const { match: { params } } = this.props;
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Row>
                    <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control placeholder="First name" ref='firstName'/>
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Last name</Form.Label>
                    <Form.Control placeholder="Last name" ref='lastName'/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" ref='email'/>
                </Form.Group>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" ref='street'/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control ref='city'/>
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
                    <Form.Control ref='zipcode'/>
                    </Form.Group>
                </Form.Row>

                <Button variant="outline-secondary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default UserCreateUpdate;