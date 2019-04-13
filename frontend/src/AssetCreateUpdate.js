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
                this.refs.owner.value.owner_id = a.owner;
                this.refs.nickname.value = a.nickname;
                this.refs.asset_class.value = a.asset_class;
                this.refs.power.value = a.power;
                this.refs.energy.value = a.energy;
                this.refs.capacity.value = a.capacity;
                this.refs.flexible.value = a.flexible;
                this.refs.preferences.value = a.preferences;
                this.refs.available.value = a.available;
                this.refs.inactive.value = a.inactive;
            })
        }
    }

    handleCreate() {
        // handle bools
        // TODO broken?
        var isFlexible = this.refs.flexible.value === "True";
        var isAvailable = this.refs.available.value === "True";

        // get the user with id = 1
        usersService.getUser(1).then((u) => {
            assetsService.createAsset(
                {
                    "owner": u.user_id,
                    "nickname": this.refs.nickname.value,
                    "asset_class": this.refs.asset_class.value,
                    "power": this.refs.power.value,
                    "energy": this.refs.energy.value,
                    "capacity": this.refs.capacity.value,
                    "flexible": isFlexible,
                    "preferences": this.refs.preferences.value,
                    "available": isAvailable,
                    "inactive": false,
                }
            ).then((result) => {
                alert("Added " + u.first_name + "'s new asset!");
            }).catch(() => {
                alert('there was an error! Please re-check your form.');
            });
        },
            error => {
                console.error(error);
            }
        );
    }

    handleUpdate(asset_id) {
        // get the user with id = 1

        // TODO make it like in handleCreate above

        var u = usersService.getUser(1);
        assetsService.updateAsset(
            {
                "asset_id": asset_id,
                "owner": u,
                "nickname": this.refs.nickname.value,
                "asset_class": this.refs.asset_class.value,
                "power": this.refs.power.value,
                "energy": this.refs.energy.value,
                "capacity": this.refs.capacity.value,
                "flexible": this.refs.flexible.value,
                "preferences": this.refs.preferences.value,
                "available": this.refs.available.value,
                "inactive": this.refs.inactive.value,
            }
        ).then((result) => {
            alert("Asset updated!");
        }).catch(() => {
            alert('There was an error! Please check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            this.handleUpdate(params.asset_id);
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
                    {/* TODO make this a bool field */}
                    <label>
                        Flexible:</label>
                    <br />
                    <input name='isFlexible' type="radio" ref='flexible' value='True' />True<br />
                    <input name='isFlexible' type="radio" ref='flexible' value='False' />False<br />
                    <br />
                    <label>
                        Preferences:</label>
                    <input className="form-control" type="text" ref='preferences' />
                    <br />
                    {/* TODO make this a bool field */}
                    <label>
                        Available:</label>
                    <br />
                    <input name='isAvailable' type="radio" ref='available' value='True' />True<br />
                    <input name='isAvailable' type="radio" ref='available' value='False' />False<br />
                    <br />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default AssetCreateUpdate;