import React, { Component } from 'react';
import UsersService from './UsersService';
import Geocode from "react-geocode"; // for use changing addr -> lat & long

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
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        First Name:</label>
                    <input className="form-control" type="text" ref='firstName' />

                    <label>
                        Last Name:</label>
                    <input className="form-control" type="text" ref='lastName' />

                    <label>
                        Email:</label>
                    <input className="form-control" type="text" ref='email' />

                    <label>
                        Street:</label>
                    <input className="form-control" type="text" ref='street' />

                    <label>
                        City:</label>
                    <input className="form-control" type="text" ref='city' />

                    {/* TODO make this a dropdown in the future? */}
                    <label>
                        State:</label>
                    <input className="form-control" type="text" ref='state' />

                    <label>
                        Zipcode:</label>
                    <input className="form-control" type="text" ref='zipcode' />

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default UserCreateUpdate;