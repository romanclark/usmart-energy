import React, { Component } from 'react';
import AssetsService from './AssetsService';
import Map from './Map.js';

const assetsService = new AssetsService();

class AssetsListByUser extends Component {
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
        const { match: { params } } = this.props;
        assetsService.getAssetsByUser(params.user_id).then(function (result) {
            self.setState({ assets: result.data, nextPageurl: result.nextlink })
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


    render() {
        const { match: { params } } = this.props;
        return (
            <div className="assets--list">
                <h2>My Assets</h2>
                <table className="table">
                    <thead key="thead">
                        <tr>
                            {/* the column labels for the list */}
                            <th>Nickname</th>
                            <th>Asset Type</th>
                            <th>Power</th>
                            <th>Energy</th>
                            <th>Capacity</th>
                            <th>Flexible</th>
                            <th>User Preferences</th>
                            <th>Currently Available</th>                            
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
                                    <button onClick={(e) => this.handleDelete(e, a)}> Delete</button>
                                    <a href={"/assets/" + a.asset_id}> Update</a>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
                <a className="btn btn-primary" href={"/asset/" + params.user_id}> Create New</a>
                <br>
                </br>
                <a className="btn btn-primary" href={"/users/" + params.user_id}>Update My Account</a>
            <Map/>
            
            </div>
        );

    }
}
export default AssetsListByUser;


  