import React, { Component } from 'react';
import UsersService from './UsersService';

const usersService = new UsersService();

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
                this.refs.address.value = u.address;
            })
        }
    }

    // It calls the corresponding UsersService.createUser() method that makes the actual API call to the backend to create a user.
    handleCreate() {
        usersService.createUser(
            {
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "address": this.refs.address.value,
            }
        ).then((result) => {
            alert("User created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    // It calls the corresponding UsersService.updateUser() method that makes the actual API call to the backend to create a user.
    handleUpdate(user_id) {
        usersService.updateUser(
            {
                "user_id": user_id,
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "address": this.refs.address.value,
            }
        ).then((result) => {
            console.log(result);
            alert("User updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
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
                        Address:</label>
                    <input className="form-control" type="text" ref='address' />

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default UserCreateUpdate;