import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowRight } from 'react-icons/fa';

import AssetsService from '../assets/AssetsService';
import UsersService from '../user-view/UsersService';
const assetsService = new AssetsService();
const usersService = new UsersService();

class ListOfAllAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            nextPageURL: '',
            users: []
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        assetsService.getAssets().then(function (result) {
            self.setState({ assets: result.data, nextPageurl: result.nextlink })
        });
        usersService.getUsers().then(function (result) {
            self.setState({ users: result.data })
        });
    }

    handleDelete(e, asset_id) {
        var self = this;
        assetsService.deleteAsset({ asset_id: asset_id }).then(() => {
            var newArr = self.state.assets.filter(function (obj) {
                return obj.asset_id !== asset_id;
            });
            self.setState({ assets: newArr })
        });
    }

    nextPage() {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink })
        });
    }

    render() {
        return (
            <div>
                <p className="placeholder-text">List Of All Assets</p>
                {/* <Button id="btn-top" variant="outline-secondary" href={"/distributor/"}><FaArrowLeft /> Back to System Distributor</Button> */}
                <p className="page-subtitle">All Assets in System</p>

                <DropdownButton id="dropdown-basic-button" title="Filter asset list by user">
                    {this.state.users.map(key => (
                        /* TODO why can't filterByUser get called here instead of alert? */
                        /* TODO maybe do a seperate component that passes props with a filtered assets list? */
                        /* TODO or do something with the componentWillUpdate? */
                        <li key={key.user_id}>
                            {/* <a onClick={
                                this.setState({assets: this.state.assets.filter(asset => asset.asset_id === key.user_id)})
                                } >{key.first_name} {key.last_name}</a> */}
                            <Dropdown.Item href="#">{key.first_name} {key.last_name}</Dropdown.Item>
                        </li>
                    ))}
                </DropdownButton>

                <Table responsive striped borderless size="sm">
                    <thead key="thead">
                        <tr>
                            {/* the column labels for the list */}
                            <th>Asset ID</th>
                            <th>Owner</th>
                            <th>Nickname</th>
                            <th>Asset Type</th>
                            <th>Power (kW)</th>
                            <th>Energy (kWh)</th>
                            <th>Capacity</th>
                            <th>Flexible</th>
                            <th>User Preferences</th>
                            <th>Currently Available</th>
                            <th>Inactive</th>
                            {/* <th>Options</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.assets.map(a =>
                            <tr key={a.asset_id}>
                                {/* the data that is pulled into the columns in the list */}
                                <td>{a.asset_id}</td>
                                <td>{a.owner}</td>
                                <td>{a.nickname}</td>
                                <td>{a.asset_class}</td>
                                <td>{a.power}</td>
                                <td>{a.energy}</td>
                                <td>{a.capacity}</td>
                                <td>{a.flexible.toString()}</td>
                                <td>{a.preferences}</td>
                                <td>{a.available.toString()}</td>
                                <td>{a.inactive.toString()}</td>
                                {/* <td>
                                    <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, a.asset_id)}> Delete</Button>
                                    <Button variant="outline-primary" size="sm" href={"/assets/" + a.asset_id}> Update</Button>
                                </td> */}
                            </tr>)}
                    </tbody>
                </Table>
                {/* <Button variant="outline-secondary" href={"/asset/"}>Create New Asset</Button> */}
                {/* TODO put an if so the button doesn't show up if there isn't more than one page */}
                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
            </div>
        )
    }
}

export default ListOfAllAssets;