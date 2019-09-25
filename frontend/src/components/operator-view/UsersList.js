import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import UsersService from '../user-view/UsersService';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { FaArrowLeft, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { AuthConsumer } from '../auth/authContext';

const usersService = new UsersService();

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.users.length !== this.state.users.length
    }

    componentDidMount() {
        var self = this;
        usersService.getUsers(self.props.token).then((result) => {
            self.setState({ users: result.data, nextPageURL: result.nextlink })
        });
    }

    handleDelete(e, user_id, token) {
        var self = this;
        usersService.deleteUser({ user_id: user_id }, token).then(() => {
            var newArr = self.state.users.filter(function (obj) {
                return obj.user_id !== user_id;
            });
            self.setState({ users: newArr })
        });
    }

    nextPage(token) {
        var self = this;
        usersService.getUsersByURL(this.state.nextPageURL, token).then((result) => {
            self.setState({ users: result.data, nextPageURL: result.nextlink })
        });
    }

    goBack() {
        window.history.back();
    }

    // renders a table of users from the component state
    render() {

        return (
            <AuthConsumer>
                {({ accessToken }) => (
                    <div className="users--list">
                        <Button id="btn-top" variant="outline-secondary" href={"/distributor/"}><FaArrowLeft /> Back to System Distributor</Button>
                        <p className="page-title">All Users in System</p>
                        <Table responsive striped borderless hover size="sm">
                            <thead key="thead">
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zipcode</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(u =>
                                    <tr key={u.user_id}>
                                        <td>{u.user_id}  </td>
                                        <td>{u.first_name}</td>
                                        <td>{u.last_name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.street}</td>
                                        <td>{u.city}</td>
                                        <td>{u.state}</td>
                                        <td>{u.zipcode}</td>
                                        <td>
                                            <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, u.user_id, accessToken)}> Delete</Button>
                                            <Button variant="outline-primary" size="sm" href={"/users/" + u.user_id}> Update</Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        <Button variant="outline-secondary" href={"/user/"}>Create New User <FaUserPlus /></Button>
                        <Button variant="outline-secondary" onClick={this.nextPage, accessToken}>Next <FaArrowRight /></Button>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}
export default UsersList;