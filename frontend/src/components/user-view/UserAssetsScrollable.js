import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';

import AssetsService from '../assets/AssetsService';
const assetsService = new AssetsService();

class UserAssetsScrollable extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getAssets = this.getAssets.bind(this);

        // set state
        this.state = {
            assets: []
        };
    }

    componentWillReceiveProps() {
        if (this.props.user_id !== null) {
            this.getAssets(this.props.user_id, this.props.token);
        }
    }

    getAssets(user_id, token) {
        var self = this;
        assetsService.getAllAssetsByUser(user_id, token).then((result) => {
            self.setState({ assets: result.data })
        });
    }

    handleDelete(e, a) {
        var self = this;
        assetsService.deleteAsset(
            {
                "asset_id": a.asset_id,
                "owner": a.owner,
                "nickname": a.nickname,
                "asset_class": a.asset_class,
                "power": a.power,
                "energy": a.energy,
                "capacity": a.capacity,
                "flexible": a.flexible,
                "preferences": a.preferences,
                "available": a.available,
                "inactive": true
            }, this.props.token).then(() => {
                assetsService.getAllAssetsByUser(this.props.user_id, this.props.token).then(function (result) {
                    self.setState({ assets: result.data })
                });
            });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">{this.props.first_name}'s Assets</p>
                {this.state.assets.length > 0 ? (
                    <div className="scrollable-small">
                        <Table responsive striped borderless hover size="lg">
                            <thead key="thead">
                                <tr>
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Power</th>
                                    <th>Energy</th>
                                    <th>Capacity</th>
                                    <th>Flexible</th>
                                    <th>Deadline</th>
                                    <th>Currently Available</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assets.map(a =>
                                    <tr key={a.asset_id}>
                                        <td>{a.nickname}</td>
                                        <td>{a.asset_class}</td>
                                        <td>{a.power} kW</td>
                                        <td>{a.energy} kWh</td>
                                        <td>{a.capacity} kW</td>
                                        <td>{a.flexible.toString()}</td>
                                        <td>{a.user_deadline.toString().replace('T', ' at ').slice(0, a.user_deadline.toString().length)}</td>
                                        <td>{a.available.toString().charAt(0).toUpperCase() + a.available.toString().slice(1)}</td>
                                        <td>
                                            <Button className="asseet-button" variant="outline-secondary" size="sm" onClick={(e) => this.handleDelete(e, a)}> Delete</Button>
                                            <LinkContainer to={"/assets/" + a.asset_id}>
                                                <Button className="asset-button" variant="outline-warning" size="sm"> Update</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                        <div>
                            <p className="error">
                                You don't have any assets yet!
                                <LinkContainer to={"/asset/" + this.props.user_id}>
                                    <span className="asset-link"> Click here </span>
                                </LinkContainer>
                                to add one.
                            </p>
                        </div>
                    )}
            </div>
        )
    }
}
export default UserAssetsScrollable;


