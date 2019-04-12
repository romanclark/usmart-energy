import React, { Component } from 'react';

import DevicesService from './DevicesService';
const devicesService = new DevicesService();

class DeviceCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.device_id) {
            devicesService.getDevice(params.device_id).then((d) => {
                this.refs.nickname.value = d.nickname;
                this.refs.device_type.value = d.device_type;
                this.refs.charge_deadline.value = d.charge_deadline;
                // this.refs.owner_id.value = d.owner_id;
            })
        }
    }

    handleCreate() {
        devicesService.createDevice(
            {
                "nickname": this.refs.nickname.value,
                "device_type": this.refs.device_type.value,
                "charge_deadline": this.refs.charge_deadline.value,
                // "owner_id": this.refs.owner_id.value,
            }).then((result) => {
                alert("Device created!");
            }).catch(() => {
                alert('There was an error! Please re-check your form.');
            });
    }

    handleUpdate(device_id) {
        devicesService.updateDevice(
            {
                "device_id": device_id,
                "nickname": this.refs.nickname.value,
                "device_type": this.refs.device_type.value,
                "charge_deadline": this.refs.charge_deadline.value,
                // "owner_id": this.refs.owner_id.value,
            }
        ).then((result) => {

            alert("Device updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.device_id) {
            this.handleUpdate(params.device_id);
        }
        else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Nickname:</label>
                    <input className="form-control" type="text" ref='nickname' />

                    <label>
                        Device Type:</label>
                    <input className="form-control" type="text" ref='device_type' />

                    <label>
                        Charge Deadline:</label>
                    <input className="form-control" type="text" ref='charge_deadline' />

                    {/* <label>
                        Owner Id:</label>
                    <input className="form-control" type="text" ref='owner_id' /> */}

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default DeviceCreateUpdate;