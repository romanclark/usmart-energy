import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'

import AssetsService from '../assets/AssetsService';
const assetsService = new AssetsService();

class ListOfAllAssetsScrollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        assetsService.getAllAssets(this.props.token).then(function (result) {
            self.setState({ assets: result.data })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">Assets in System ({this.state.assets.length} assets)</p>
                {this.state.assets.length > 0 ? (
                    <div className="scrollable">
                        <Table responsive striped borderless size="lg">
                            <thead key="thead">
                                <tr>
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Owner</th>
                                    <th>Power</th>
                                    <th>Energy</th>
                                    <th>Capacity</th>
                                    <th>
                                        <OverlayTrigger placement='left' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">this is dummy text</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Flexible?
                                    </th>
                                    <th>Deadline</th>
                                    <th>
                                    <OverlayTrigger placement='left' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">this is dummy text</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                    Available?
                                    </th>
                                    {/* <th>
                                        Inactive?
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assets.map(a =>
                                    <tr key={a.asset_id}>
                                        <td>{a.nickname}</td>
                                        <td>{a.asset_class}</td>
                                        <td>{a.owner.first_name} {a.owner.last_name}</td>
                                        <td>{a.power.toFixed(1)} kW</td>
                                        <td>{a.energy.toFixed(1)} kWh</td>
                                        <td>{a.capacity.toFixed(1)} kW</td>
                                        <td>{a.flexible.toString().charAt(0).toUpperCase() + a.flexible.toString().slice(1)}</td>
                                        <td>{a.asset_class.includes("Solar Panel") ? "N/A" : a.user_deadline.toString().replace('T', ' at ').slice(0, a.user_deadline.toString().length)}</td>
                                        <td>{a.available.toString().charAt(0).toUpperCase() + a.available.toString().slice(1)}</td>
                                        {/* <td>{a.inactive.toString().charAt(0).toUpperCase() + a.inactive.toString().slice(1)}</td> */}
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