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
                                <tr className="operator-headers">
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Owner</th>
                                    <th>Power</th>
                                    <th>Energy</th>
                                    <th>Capacity</th>
                                    <th>
                                        <OverlayTrigger placement='left' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset able to be used in a flexible manner? (ie. charging and usage can be shifted in time)</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Flexible usage?
                                    </th>
                                    <th>Deadline</th>
                                    <th>
                                        <OverlayTrigger placement='left' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset in an available state for use? (ie. to recieve a charge or to pull energy from)</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        Currently available?
                                    </th>
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
                                        <td>{a.flexible ? "Yes" : "No"}</td>
                                        <td>{a.asset_class.includes("Solar Panel") ? "N/A" : a.user_deadline.toString().replace('T', ' at ').slice(0, a.user_deadline.toString().length)}</td>
                                        <td>{a.available ? "Yes" : "No"}</td>
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