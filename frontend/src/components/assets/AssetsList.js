import React, { Component } from 'react';
import AssetsService from './AssetsService';
import UsersService from '../user-view/UsersService';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const assetsService = new AssetsService();
const usersService = new UsersService();

class AssetsList extends Component {
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

    // TODO why can't this get called?
    filterByUser(user_id) {
        // alert("filtering by id: " + user_id);
        // var filteredAssets = this.state.assets.filter(asset => asset.asset_id === user_id);
        // this.setState({ assets: filteredAssets });
        this.setState({ assets: assetsService.getAssetsByUser(user_id) });
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div className="assets--list">
                <Button id="btn-top" variant="outline-secondary" href={"/distributor/"}><FaArrowLeft /> Back to System Distributor</Button>
                <p className="page-title">All Assets in System</p>
                <p className="page-title">Filter</p>

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

                <Table responsive striped bordered size="sm">
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
                            <th>Options</th>
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
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, a.asset_id)}> Delete</Button>
                                    <Button variant="outline-primary" size="sm" href={"/assets/" + a.asset_id}> Update</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                {/* <Button variant="outline-secondary" href={"/asset/"}>Create New Asset</Button> */}
            </div>
        );
    }
}
export default AssetsList;