import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
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
        assetsService.getAssets(this.props.token).then(function (result) {
            self.setState({ assets: result.data, nextPageurl: result.nextlink })
        });
        usersService.getUsers(this.props.token).then(function (result) {
            self.setState({ users: result.data })
        });
    }

    handleDelete(e, asset_id) {
        var self = this;
        assetsService.deleteAsset({ asset_id: asset_id }, this.props.token).then(() => {
            var newArr = self.state.assets.filter(function (obj) {
                return obj.asset_id !== asset_id;
            });
            self.setState({ assets: newArr })
        });
    }

    nextPage() {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL, this.props.token).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink })
        });
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div className="assets--list">
                <LinkContainer to="/distributor/">
                    <Button id="btn-top" variant="outline-secondary"><FaArrowLeft /> Back to System Distributor</Button>
                </LinkContainer>
                <p className="page-title">All Assets in System</p>
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
                            <th>Currently Available</th>
                            <th>Deadline</th>
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
                                <td>{a.available.toString()}</td>
                                <td>{a.user_deadline}</td> {/* this is where we will want to format the date */}
                                <td>{a.inactive.toString()}</td>
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, a.asset_id)}> Delete</Button>
                                    <LinkContainer to={"/assets/" + a.asset_id}>
                                        <Button variant="outline-primary" size="sm"> Update</Button>
                                    </LinkContainer>
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