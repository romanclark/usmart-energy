import React, { Component } from 'react';

import AssetsService from './AssetsService';
const assetsService = new AssetsService();


class AssetsList extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            assets: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount()
    {
        var self = this;
        assetsService.getAssets().then(function (result) {
            self.setState({ assets: result.data, nextPageurl: result.nextlink})
        });
    }

    handleDelete(e, asset_id)
    {
        var self = this;
        assetsService.deleteAsset({asset_id : asset_id}).then(() => {
            var newArr = self.state.assets.filter(function(obj) {
                return obj.asset_id !== asset_id;
            });
            self.setState({assets: newArr})
        });
    }

    nextPage()
    {
        var self = this;
        assetsService.getAssetsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ assets: result.data, nextPageURL: result.nextlink})
        });
    }


    render() {

        return (
        <div  className="assets--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#ID:</th>
                    <th>Nickname</th>
                    <th>Asset Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.assets.map( a  =>
                    <tr  key={a.asset_id}>
                        <td>{a.asset_id}  </td>
                        <td>{a.nickname}</td>
                        <td>{a.asset_type}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,a.asset_id) }> Delete</button>
                        <a  href={"/assets/" + a.asset_id}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            <a className="btn btn-primary" href={"/asset/"}> Create New</a>
        </div>
        );
    }



}
export default AssetsList;