import React, { Component } from 'react';
import AssetsService from './AssetsService';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const assetsService = new AssetsService();

class AssetsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        assetsService.getAssets().then(function (result) {
            self.setState({ assets: result.data, nextPageurl: result.nextlink })
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

    goBack() {
        window.history.back();
    }

    render() {

        return (
            <div className="assets--list">
                <Button variant="outline-secondary" onClick="/distributor/">Return to System Distributor</Button>
                <Table responsive striped bordered hover size="sm">
                    <thead key="thead">
                        <tr>
                            {/* the column labels for the list */}
                            <th>Asset ID</th>
                            <th>Owner</th>
                            <th>Nickname</th>
                            <th>Asset Type</th>
                            <th>Power</th>
                            <th>Energy</th>
                            <th>Capacity</th>
                            <th>Flexible</th>
                            <th>User Preferences</th>
                            <th>Currently Available</th>
                            <th>Inactive</th>
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
                <Button variant="outline-secondary" onClick={this.nextPage}>Next</Button>
                <Button variant="outline-secondary" href={"/asset/"}> Create New</Button>
            </div>
        );
    }
}
export default AssetsList;