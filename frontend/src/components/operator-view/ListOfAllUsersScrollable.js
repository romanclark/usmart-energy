import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

import UsersService from '../user-view/UsersService';
const usersService = new UsersService();

class ListOfAllUsersScrollable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        usersService.getAllUsers().then(function (result) {
            self.setState({
                users: result.data
            })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">System Users</p>
                {this.state.users.length > 0 ? (
                    <div className="scrollable">
                        <Table responsive striped borderless hover size="lg">
                            <thead key="thead">
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zipcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(u =>
                                    <tr key={u.user_id}>
                                        {/* <td>{u.user_id}</td> */}
                                        <td>{u.first_name}</td>
                                        <td>{u.last_name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.street}</td>
                                        <td>{u.city}</td>
                                        <td>{u.state}</td>
                                        <td>{u.zipcode}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
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

export default ListOfAllUsersScrollable;