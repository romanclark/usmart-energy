import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaArrowRight } from 'react-icons/fa';

import UsersService from '../user-view/UsersService';
const usersService = new UsersService();

class ListOfAllUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        usersService.getUsers().then(function (result) {
            self.setState({ users: result.data, nextPageURL: result.nextlink })
        });
        console.log("url: " + this.state.nextPageURL);
    }

    handleDelete(e, user_id) {
        var self = this;
        usersService.deleteUser({ user_id: user_id }).then(() => {
            var newArr = self.state.users.filter(function (obj) {
                return obj.user_id !== user_id;
            });
            self.setState({ users: newArr })
        });
    }

    nextPage() {
        var self = this;
        usersService.getUsersByURL(this.state.nextPageURL).then((result) => {
            self.setState({ users: result.data, nextPageURL: result.nextlink })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">System Users</p>
                {this.state.users.length > 0 ? (
                    <div>
                        <Table responsive striped borderless hover size="sm">
                            <thead key="thead">
                                <tr>
                                    <th>id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zipcode</th>
                                    {/* <th>Options</th> */}
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
                                        {/* <td>
                                    <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, u.user_id)}> Delete</Button>
                                    <Button variant="outline-primary" size="sm" href={"/users/" + u.user_id}> Update</Button>
                                </td> */}
                                    </tr>)}
                            </tbody>
                        </Table>
                        {this.state.users.length > 10 ? (
                            <div>
                                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                            </div>
                        ) : (
                                <div></div>
                            )}
                    </div>
                ) : (
                        <div>
                            <p className="error">No users exist in the system!</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default ListOfAllUsers;