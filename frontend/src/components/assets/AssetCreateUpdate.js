import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Col from 'react-bootstrap/Col';

import AssetsService from './AssetsService';
// import UsersService from './UsersService';

const assetsService = new AssetsService();

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
                // this.refs.preferences.value = a.preferences;
                this.refs.hours.value = a.hours;
                this.refs.minutes.value = a.minutes;
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
                // "preferences": this.refs.preferences.value,
                "hours": this.refs.hours.value,
                "minutes": this.refs.minutes.value,
                "available": this.refs.available.checked,
                "inactive": false,
            }
        ).then((result) => {
            alert("Added new asset!");
            window.location.href = "/homeowner/" + user_id;
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
                    // "preferences": this.refs.preferences.value,
                    "hours": this.refs.hours.value,
                    "minutes": this.refs.minutes.value,
                    "available": this.refs.available.checked,
                    "inactive": false
                }
            ).then((result) => {
                console.log(result)
                alert("Asset updated!");
                window.location.href = "/personal/" + u.user_id;
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
            <div className="container">
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <p className="page-title">My Asset</p>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Nickname:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Choose a name for your Asset to make it easy to recodgnize.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control placeholder="Name your asset" ref='nickname' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Asset Class:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">What type of Asset is this and what purpose will it serve?</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control as="select" ref='asset_class'>
                                <option>Select...</option>
                                <option>Electric Vehicle</option>
                                <option>Solar Panel</option>
                                <option>Solar Panel with Battery</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Power:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">This will eventually not need to be input manually as we hope to have a device
                        communicate autonomously with the server.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" placeholder="kW" step="0.01" ref='power' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Energy:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The current level of avaliable energy in the asset.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" placeholder="kWh" step="0.01" ref='energy' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Capacity:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The maximum amount of energy storable in the asset.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" placeholder="kWh" step="0.01" ref='capacity' />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Hour of deadline:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">When do you want your deviced charged by?</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" min="0" max="24" placeholder="hours" step="1" ref='hours' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Minute of deadline:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">When do you want your deviced charged by?</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" min="0" max="55" placeholder="minutes" step="5" ref='minutes' />
                        </Form.Group>
                    </Form.Row>

                    {/* <Form.Group>
                        <Form.Label>Preferences:</Form.Label>
                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Preferences for each asset. For example, you may want your tesla done charging by 7 am before
                        you go to work, or maybe you only want to sell solar panel energy at certain hours</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                            </span>
                        </OverlayTrigger>
                        <Form.Control as="textarea" rows="3" ref='preferences' />
                    </Form.Group> */}

                    <Form.Row>
                        <Form.Check type="checkbox" label="Flexible Asset" name='isFlexible' id="isFlexible" ref='flexible' value='flexible' />
                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is the asset able to be used in a flexible manner such as charging times and usage?</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                            </span>
                        </OverlayTrigger>
                    </Form.Row>
                    <Form.Row>
                        <Form.Check type="checkbox" label="Available Asset" name='isAvailable' id="isAvailable" ref='available' value='available' />
                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is the asset in an available state for use such as to charge or pull energy from?</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                            </span>
                        </OverlayTrigger>
                    </Form.Row>

                    <Button variant="outline-secondary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>
        );
    }
}
export default AssetCreateUpdate;