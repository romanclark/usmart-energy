import React, { Component } from 'react';
import AssetsService from '../assets/AssetsService';
import Map from '../map/Map';
import TransactionsService from '../operator-view/TransactionsService';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse'

import { FaUser, FaBolt, FaArrowRight } from 'react-icons/fa';

const assetsService = new AssetsService();
const transactionsService = new TransactionsService();

class AssetsListByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            user_stats: [],
            nextPageURL: '',
            open: false
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        const { match: { params } } = this.props;
        var today = new Date();
        var thisMonth = today.getMonth() + 1;
        transactionsService.getMonthlyTransactionsByUser(params.user_id, thisMonth).then(function (user_data) {
            assetsService.getAssetsByUser(params.user_id).then(function (result) {
                self.setState({ assets: result.data, user_stats: user_data, nextPageurl: result.nextlink })
            });
        });
    }

    handleDelete(e, a) {
        var self = this;
        const { match: { params } } = this.props;
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
            }).then(() => {
                assetsService.getAssetsByUser(params.user_id).then(function (result) {
                    self.setState({ assets: result.data, nextPageurl: result.nextlink })
                });
            });
    }


    nextPage() {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink })
        });
    }

    toggle() {
        var self = this;
        self.setState({ collapse: !this.state.collapse });
    }


    render() {
        const { match: { params } } = this.props;
        const { open } = this.state;
        return (
            <div className="assets--list">
                <br></br>
                <Button
                    id="btn-stats"
                    variant = "secondary"
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    >View My Monthly Stats</Button>

                <Collapse in={this.state.open}>
                    <div id = "card-deck">
                        <CardDeck>
                            <Card>
                                <Card.Body>
                                <Card.Title>${Number(this.state.user_stats[0]).toFixed(2)}</Card.Title>
                                <Card.Text>
                                    Total spent on USmart Energy this month
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title>${Number(this.state.user_stats[2]).toFixed(2)}</Card.Title>
                                <Card.Text>
                                    Total sold on USmart Energy this month
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title>{this.state.user_stats[1]} kWh</Card.Title>
                                <Card.Text>
                                    Energy bought on USmart Energy this month
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title>{this.state.user_stats[3]} kWh</Card.Title>
                                <Card.Text>
                                    Energy sold on USmart Energy this month
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                <Card.Title>${Number(this.state.user_stats[4]).toFixed(2)}</Card.Title>
                                <Card.Text>
                                    Total saved on USmart Energy this month
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </div>
                </Collapse>

                <p className="page-title">My Assets</p>
                <Table responsive striped bordered hover size="sm" className="box">
                    <thead key="thead">
                        <tr>
                            {/* the column labels for the list */}
                            <th>Nickname</th>
                            <th>Asset Type</th>
                            <th>Power (kW)</th>
                            <th>Energy (kWh)</th>
                            <th>Capacity</th>
                            <th>Flexible</th>
                            <th>User Preferences</th>
                            <th>Currently Available</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.assets.map(a =>
                            <tr key={a.asset_id}>
                                {/* the data that is pulled into the columns in the list */}
                                <td>{a.nickname}</td>
                                <td>{a.asset_class}</td>
                                <td>{a.power}</td>
                                <td>{a.energy}</td>
                                <td>{a.capacity}</td>
                                <td>{a.flexible.toString()}</td>
                                <td>{a.preferences}</td>
                                <td>{a.available.toString()}</td>
                                {/* ^^^ TODO do we want the below code to display the owner's name instead of owner id? */}
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={(e) => this.handleDelete(e, a)}> Delete</Button>
                                    <Button variant="outline-primary" size="sm" href={"/assets/" + a.asset_id}> Update</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Button variant="outline-secondary" href={"/asset/" + params.user_id}>Add Asset <FaBolt /></Button>
                <Button variant="outline-secondary" href={"/users/" + params.user_id}><FaUser /> Update My Account</Button>
                <Button variant="outline-secondary" onClick={this.nextPage}>Next <FaArrowRight /></Button>
                <br></br>
                <p className="page-title"> My Neighborhood</p>
                <Map/>
            </div>
        );

    }
}
export default AssetsListByUser;


  