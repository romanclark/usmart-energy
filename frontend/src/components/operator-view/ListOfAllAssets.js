import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

import AssetsService from '../assets/AssetsService';
import UsersService from '../user-view/UsersService';
const assetsService = new AssetsService();
const usersService = new UsersService();

class ListOfAllAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            assets: [],
            nextPageURL: '',
            prevPageURL: '',
            numPages: 0
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    // the React lifecycle method being called when the component is mounted and ready to go
    componentDidMount() {
        var self = this;
        assetsService.getAssets(this.props.token).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink, numPages: result.numpages })
        });
        usersService.getUsers(this.props.token).then((result) => {
            self.setState({ users: result.data })
        });
    }

    nextPage() {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL, this.props.token).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink, prevPageURL: result.prevlink, numPages: result.numpages })
        });
    }

     prevPage() {
        var self = this;
        if (self.state.prevPageURL === '') {
            // do nothing
            return
        }
        assetsService.getAssetsByURL(this.state.prevPageURL).then((result) => {
            self.setState({ assets: result.data, prevPageURL: result.prevLink, nextPageURL: result.nextlink, numPages: result.numpages })
        });
    }

    render() {
        return (
            <div>
                <p className="page-subtitle">All Assets in System</p>
                {this.state.assets.length > 0 ? (
                    <div>
                        {/* filter asset by user placeholder*/}

                        <Table responsive striped borderless size="lg">
                            <thead key="thead">
                                <tr>
                                    {/* <th>Asset ID</th> */}
                                    <th>Owner ID</th>
                                    <th>Nickname</th>
                                    <th>Asset Type</th>
                                    <th>Power (kW)</th>
                                    <th>Energy (kWh)</th>
                                    <th>Capacity</th>
                                    <th>Flexible?</th>
                                    <th>Deadline</th>
                                    <th>Currently Available</th>
                                    <th>Inactive?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assets.map(a =>
                                    <tr key={a.asset_id}>
                                        {/* <td>{a.asset_id}</td> */}
                                        <td>{a.owner}</td>
                                        <td>{a.nickname}</td>
                                        <td>{a.asset_class}</td>
                                        <td>{a.power}</td>
                                        <td>{a.energy}</td>
                                        <td>{a.capacity}</td>
                                        <td>{a.flexible.toString()}</td>
                                        <td>{a.user_deadline.toString().replace('T', ' at ')}</td>
                                        <td>{a.available.toString().charAt(0).toUpperCase() + a.available.toString().slice(1)}</td>
                                        <td>{a.inactive.toString().charAt(0).toUpperCase() + a.inactive.toString().slice(1)}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                        {this.state.numPages > 1 ? (
                            <div>
                                <Button variant="outline-secondary" onClick={this.prevPage}><FaArrowLeft /> Prev</Button>
                                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>

                            </div>
                        ) : (
                                <div></div>
                            )}
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

export default ListOfAllAssets;