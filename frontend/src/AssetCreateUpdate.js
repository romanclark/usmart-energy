import React, { Component } from 'react';
import AssetsService from './AssetsService';
import UsersService from './UsersService';

const assetsService = new AssetsService();
const usersService = new UsersService();

class AssetCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            assetsService.getAsset(params.asset_id).then((a) => {
                this.refs.nickname.value = a.nickname;
                this.refs.asset_class.value = a.asset_class;
                this.refs.power.value = a.power;
                this.refs.energy.value = a.energy;
                this.refs.capacity.value = a.capacity;
                this.refs.flexible.checked = a.flexible;
                this.refs.preferences.value = a.preferences;
                this.refs.available.value = a.available;
            })
        }
    }

    handleCreate(user_id) {
        assetsService.createAsset(
            {
                "owner": user_id,
                "nickname": this.refs.nickname.value,
                "asset_class": this.refs.asset_class.value,
                "power": this.refs.power.value,
                "energy": this.refs.energy.value,
                "capacity": this.refs.capacity.value,
                "flexible": this.refs.flexible.checked,
                "preferences": this.refs.preferences.value,
                "available": this.refs.available.checked,
                "inactive": false,
            }
        ).then((result) => {
            alert("Added new asset!");
        }).catch(() => {
            alert('there was an error! Please re-check your form.');
        },
            error => {
                console.error(error);
            }
        );
    }

    handleUpdate(asset_id) {
        assetsService.getUserByAsset(asset_id).then((u) => {
            assetsService.updateAsset(
                {
                    "asset_id": asset_id,
                    "owner": u.user_id,
                    "nickname": this.refs.nickname.value,
                    "asset_class": this.refs.asset_class.value,
                    "power": this.refs.power.value,
                    "energy": this.refs.energy.value,
                    "capacity": this.refs.capacity.value,
                    "flexible": this.refs.flexible.checked,
                    "preferences": this.refs.preferences.value,
                    "available": this.refs.available.checked,
                    "inactive": false
                }
            ).then((result) => {
                console.log(result)
                alert("Asset updated!");
            }).catch(() => {
                alert('There was an error! Please check your form.');
            });
        },
            error => {
                console.error(error);
            }
        );
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            this.handleUpdate(params.asset_id);
        }
        else {
            this.handleCreate(params.user_id);
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
                    <br />
                    <label>
                        Asset Class:</label>
                    <input className="form-control" type="text" ref='asset_class' />
                    <br />
                    <label>
                        Power:</label>
                    <input className="form-control" type="number" ref='power' />
                    <br />
                    <label>
                        Energy:</label>
                    <input className="form-control" type="number" ref='energy' />
                    <br />
                    <label>
                        Capacity:</label>
                    <input className="form-control" type="number" ref='capacity' />
                    <br />
                    <label>
                        Preferences:</label>
                    <input className="form-control" type="text" ref='preferences' />
                    <br />
                    <input name='isFlexible' id="isFlexible" type="checkbox" ref='flexible' value='flexible' />
                    <label for="isFlexible">Flexible?</label>
                    <br />
                    <input name='isAvailable' id="isAvailable" type="checkbox" ref='available' value='available' />
                    <label for="isAvailable">Currently Available?</label>
                    <br />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default AssetCreateUpdate;