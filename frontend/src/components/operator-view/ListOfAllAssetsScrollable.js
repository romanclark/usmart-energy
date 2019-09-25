import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'

import AssetsService from '../assets/AssetsService';
import UsersService from '../user-view/UsersService';
const assetsService = new AssetsService();
const usersService = new UsersService();

class ListOfAllAssetsScrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            assets: [],
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        assetsService.getAllAssets().then(function (result) {
            self.setState({ assets: result.data })
        });
        usersService.getUsers().then(function (result) {
            self.setState({ users: result.data })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">All Assets in System</p>
                {this.state.assets.length > 0 ? (
                    <div className="scrollable">
                        <Table responsive striped borderless size="lg">
                            <thead key="thead">
                                <tr>
                                    {/* <th>Asset ID</th> */}
                                    {/* <th>Owner ID</th> */}
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Power (kW)</th>
                                    <th>Energy (kWh)</th>
                                    <th>Capacity</th>
                                    <th>
                                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">this is dummy text</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Flexible?
                                    </th>
                                    <th>Deadline</th>
                                    <th>
                                    <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">this is dummy text</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Currently Available
                                    </th>
                                    <th>
                                    <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">this is dummy text</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Inactive?
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assets.map(a =>
                                    <tr key={a.asset_id}>
                                        {/* <td>{a.asset_id}</td> */}
                                        {/* <td>{a.owner}</td> */}
                                        <td>{a.nickname}</td>
                                        <td>{a.asset_class}</td>
                                        <td>{a.power.toFixed(1)}</td>
                                        <td>{a.energy.toFixed(1)}</td>
                                        <td>{a.capacity.toFixed(1)}</td>
                                        <td>{a.flexible.toString().charAt(0).toUpperCase() + a.flexible.toString().slice(1)}</td>
                                        <td>{a.asset_class.includes("Solar Panel") ? "N/A" : a.user_deadline.toString().replace('T', ' at ').slice(0, a.user_deadline.toString().length)}</td>
                                        <td>{a.available.toString().charAt(0).toUpperCase() + a.available.toString().slice(1)}</td>
                                        <td>{a.inactive.toString().charAt(0).toUpperCase() + a.inactive.toString().slice(1)}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                        <div>
                            <p className="error">No assets exist in the system!</p>
                        </div>
                    )}

            </div>
        )
    }
}

export default ListOfAllAssetsScrollable;