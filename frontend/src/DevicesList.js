import React, { Component } from 'react';

import DevicesService from './DevicesService';
const devicesService = new DevicesService();

class  DevicesList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            devices: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }


    componentDidMount() {
        var  self  =  this;
        devicesService.getDevices().then(function (result) {
            self.setState({ devices:  result.data, nextPageURL:  result.nextlink})
        });
    }


    handleDelete(e,device_id){
        var  self  =  this;
        devicesService.deleteDevice({device_id :  device_id}).then(()=>{
            var  newArr  =  self.state.devices.filter(function(obj) {
                return  obj.device_id  !==  device_id;
            });
            self.setState({devices:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        devicesService.getDevicesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ devices:  result.data, nextPageURL:  result.nextlink})
        });
    }


    render() {

        return (
        <div  className="devices--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Nickname</th>
                    <th>Device Type</th>
                    <th>Charge Deadline</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.devices.map( d  =>
                    <tr  key={d.device_id}>
                        <td>{d.device_id}  </td>
                        <td>{d.nickname}</td>
                        <td>{d.device_type}</td>
                        <td>{d.charge_deadline}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,d.device_id) }> Delete</button>
                        <a  href={"/devices/" + d.device_id}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            <a className="btn btn-primary" href={"/device/"}> Create New</a>
        </div>
        );
    }


}
export  default  DevicesList;