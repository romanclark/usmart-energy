import React, { Component, ButtonToolbar, DropdownButton, Dropdown } from 'react';
import AssetsService from './AssetsService';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
                <Button id="btn-top" variant="outline-secondary" href={"/distributor/"}><FaArrowLeft /> Back to System Distributor</Button>
                <p className="page-title">All Assets in System</p>
                <p className="page-title">Filter</p>
                {/* <ButtonToolbar>
                    {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
                        variant => (
                        <DropdownButton
                            title={variant}
                            variant={variant.toLowerCase()}
                            id={`dropdown-variants-${variant}`}
                            key={variant}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                            Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                        </DropdownButton>
                        ),
                    )}
                </ButtonToolbar> */}
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