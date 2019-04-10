import React, { Component } from 'react';

import AssetsService from './AssetsService';
const assetsService = new AssetsService();
    
class AssetCreateUpdate extends Component {

    constructor(props) 
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) 
    {
        const { match: { params } } = this.props;
        if(params && params.asset_id) {
            this.handleUpdate(params.asset_id);
        }
        else
        {
            this.handleCreate();
        }

        event.preventDefault();

    }

    handleCreate()
    {
        assetsService.createAsset(
            {
                "nickname": this.refs.nickname.value,
                "asset_type": this.refs.asset_type.value
            }).then((result) => {
                alert("Asset created!")
            }).catch(() => {
                alert('there was an error! Please re-check your form.');
            });
        
    }

    handleUpdate(asset_id)
    {
        assetsService.updateAsset(
        {
            "asset_id": asset_id,
            "nickname": this.refs.nickname.value,
            "asset_type": this.refs.asset_type.value
        }
        ).then((result)=> {
            alert("Asset updated!");
        }).catch(() => {
            alert('There was an error! Please check your form.');
        });
        
    }


    componentDidMount(){
        const { match: { params } } =  this.props;
        if(params  &&  params.asset_id)
        {
            assetsService.getAsset(params.asset_id).then((a)=>{
                this.refs.nickname.value  =  a.nickname;
                this.refs.asset_type.value  =  a.asset_type;
            })
        }
    }
   
   
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Nickname:</label>
              <input className="form-control" type="text" ref='nickname' />

            <label>
              Asset Type:</label>
              <input className="form-control" type="text" ref='asset_type'/>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
  }


}

export default AssetCreateUpdate;