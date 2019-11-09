import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaSync } from 'react-icons/fa';
import Notification from '../reuseable/Notification';

import AssetsService from '../assets/AssetsService';
const assetsService = new AssetsService();

class UserAssetsScrollable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: [],
            popupTitle: null,
            popupText: null
        };

        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            assets: this.props.assets
        })
    }

    componentWillMount() {
        var self = this;
        assetsService.getAllAssetsByUser(this.props.user_id, this.props.token).then(function (result) {
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
                    // alert('Asset deleted!');
                    self.setState({ assets: result.data })
                });
            }).catch((error) => {
                console.error(error);
                console.error(error);
                this.setState({
                    popupTitle: "Error!",
                    popupText: "There was an error deleting your asset! Please try again later."
                });
            });
    }

    refreshAssets(e) {
        var self = this;
        assetsService.getAllAssetsByUser(this.props.user_id, this.props.token).then(function (result) {
            self.setState({ assets: result.data })
        });
    }

    handleCloseNotification() {
        this.setState({
            popupTitle: null,
            popupText: null
        });
    }

    render() {
        let row = 1;
        return (
            <div>
                {this.state.popupTitle ?
                    <Notification
                        title={this.state.popupTitle}
                        message={this.state.popupText}
                        handleCloseNotification={() => this.handleCloseNotification()}
                        show={this.state.popupTitle}
                        color="rgba(216,0,12,0.2)">
                    </Notification> : null}
                <Row>
                    <Col>
                        <p className="page-subtitle">{this.props.first_name}'s Assets ({this.state.assets.length} assets)</p>
                    </Col>
                    <Col className="align-right">
                        <Button className="top-margin bottom-margin btn-outline-dark" onClick={(e) => this.refreshAssets()}><FaSync className="icon" size="2.25vmin"></FaSync></Button>
                        {this.state.assets.length > 0 ? (
                            <LinkContainer to={"/asset/" + this.props.user_id}>
                                <Button className="top-margin bottom-margin" variant="warning"><FaPlusCircle className="icon" size="3vmin"></FaPlusCircle> Add A New Asset</Button>
                            </LinkContainer>
                        ) : null}
                    </Col>
                </Row>
                {this.state.assets.length > 0 ? (
                    <div className="scrollable-small">
                        <Table responsive striped borderless hover size="lg">
                            <thead key="thead">
                                <tr className="user-headers">
                                    <th></th>
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Power</th>
                                    <th>Energy</th>
                                    <th>Capacity</th>
                                    <th>Flexible usage?</th>
                                    <th>Deadline</th>
                                    <th>Currently available?</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assets.map(a =>
                                    <tr key={a.asset_id}>
                                        <td>{row++}</td>
                                        <td>{a.nickname}</td>
                                        <td>{a.asset_class}</td>
                                        <td>{a.power.toFixed(1)} kW</td>
                                        <td>{a.energy.toFixed(1)} kWh</td>
                                        <td>{a.capacity.toFixed(1)} kW</td>
                                        <td>{a.flexible ? "Yes" : "No"}</td>
                                        <td>{a.asset_class.includes("Solar Panel") ? "N/A" : a.user_deadline.toString().replace('T', ' at ').slice(0, a.user_deadline.toString().length)}</td>
                                        <td>{a.available ? "Yes" : "No"}</td>
                                        <td>
                                            <LinkContainer to={"/assets/" + a.asset_id}>
                                                <Button className="update-button" variant="outline-warning" size="sm"> Update</Button>
                                            </LinkContainer>
                                            <Button className="delete-button" variant="outline-secondary" size="sm" onClick={(e) => this.handleDelete(e, a)}>Delete&nbsp;</Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                        <div>
                            <p className="error">
                                You don't have any assets yet! To add one,
                                <LinkContainer to={"/asset/" + this.props.user_id}>
                                    <span className="asset-link">Click Here</span>
                                </LinkContainer>
                            </p>
                        </div>
                    )}
            </div>
        )
    }
}
export default UserAssetsScrollable;


