import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

import AssetsService from '../assets/AssetsService';
const assetsService = new AssetsService();

class UserAssets extends Component {
    constructor(props) {
        super(props);

        // bind functions
        this.getAssets = this.getAssets.bind(this);
        this.nextPage = this.nextPage.bind(this);

        // set state
        this.state = {
            assets: [],
            nextPageURL: ''
        };
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        // var self = this;
        // self.getAssets(this.props.user_id);
    }

    componentWillReceiveProps() {
        if (this.props.user_id !== null) {
            this.getAssets(this.props.user_id, this.props.token);
        }
    }

    getAssets(user_id, token) {
        var self = this;
        assetsService.getAssetsByUser(user_id, token).then((result) => {
            self.setState({ assets: result.data, nextPageurl: result.nextlink })
        });
    }

    // TODO: Missing the handleDelete Method?

    nextPage() {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL, this.props.token).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">{this.props.first_name}'s Assets</p>
                {this.state.assets.length > 0 ? (
                    <div>
                        <Table responsive striped borderless hover size="lg">
                            <thead key="thead">
                                <tr>
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Power (kW)</th>
                                    <th>Energy (kWh)</th>
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
                                        <td>{a.power}</td>
                                        <td>{a.energy}</td>
                                        <td>{a.capacity}</td>
                                        <td>{a.flexible.toString()}</td>
                                        <td>{a.user_deadline}</td>
                                        <td>{a.available.toString()}</td>
                                        <td>
                                            <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, a)}> Delete</Button>
                                            <Button variant="outline-primary" size="sm" href={"/assets/" + a.asset_id}> Update</Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        {this.state.assets.length > 10 ? (
                            <div>
                                <Button variant="outline-secondary" onClick={this.nextPage()}>Next <FaArrowRight /></Button>
                            </div>
                        ) : (
                                <div></div> // don't display "Next" button if there aren't enough for a second page
                            )}
                    </div>
                ) : (
                        <div>
                            <p className="error">
                                You don't have any assets yet!
                                <a href={"/asset/" + this.props.user_id}> Click here </a>
                                to add one.
                            </p>
                        </div>
                    )}
            </div>
        )
    }
}
export default UserAssets;


