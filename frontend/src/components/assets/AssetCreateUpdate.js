import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import AssetsService from './AssetsService';
const assetsService = new AssetsService();

class AssetCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toPersonal: false,
            toHomeowner: false,
            is_solar: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAssetClassChange = this.handleAssetClassChange.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            assetsService.getAsset(params.asset_id, this.props.token).then((a) => {
                this.refs.nickname.value = a.nickname;
                this.refs.asset_class.value = a.asset_class;
                this.refs.power.value = a.power;
                this.refs.energy.value = a.energy;
                this.refs.capacity.value = a.capacity;
                this.refs.flexible.checked = a.flexible;
                this.refs.deadline.value = a.user_deadline;
                this.refs.available.checked = a.available;
                
                if (a.asset_class === "Solar Panel") {
                    this.setState({ is_solar: true });
                }
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
                "user_deadline": this.refs.deadline.value,
                "available": this.refs.available.checked,
                "inactive": false,
            }, this.props.token
        ).then((result) => {
            alert("Added new asset!");
            this.setState({ toHomeowner: true });
        }).catch((e) => {
            console.error(e);
            alert('there was an error! Please re-check your form.');
        },
            error => {
                console.error(error);
            }
        );
    }

    handleUpdate(asset_id) {
        assetsService.getUserByAsset(asset_id, this.props.token).then((u) => {
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
                    "user_deadline": this.refs.deadline.value,
                    "available": this.refs.available.checked,
                    "inactive": false
                }, this.props.token
            ).then((result) => {
                alert("Asset updated!");
                this.setState({ toHomeowner: true })
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
            this.handleCreate(this.props.user_id);
        }
        event.preventDefault();
    }

    handleAssetClassChange(event) {
        event.preventDefault();
        if (this.refs.asset_class.value === "Solar Panel") {
            this.setState({ is_solar: true });
            this.refs.deadline.value = "2000-01-01T00:00";
            this.refs.capacity.value = 0;
            this.refs.flexible.checked = false;
        }
        else {
            this.setState({ is_solar: false });
            this.refs.capacity.value = null;
        }
    }

    render() {
        if (this.state.toHomeowner === true) {
            return <Redirect to={'/'} />
        }
        return (
            <div className="container">
                {!this.props.token ? <Redirect to="/404" /> : <div></div>}
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <p className="page-title">My Asset</p>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Nickname:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">An easy to recognize name for your Asset</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control placeholder="Name your asset" ref='nickname' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Asset Class:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The type of Asset you have</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control onChange={this.handleAssetClassChange} as="select" ref='asset_class'>
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
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The amount of energy produced/consumed per hour</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" placeholder="kW" step="0.01" ref='power' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Energy:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The current level of avaliable energy</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control type="number" placeholder="kWh" step="0.01" ref='energy' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Capacity:</Form.Label>
                            <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The maximum capacity of energy</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                </span>
                            </OverlayTrigger>
                            <Form.Control disabled={this.state.is_solar} type="number" placeholder="kWh" step="0.01" ref='capacity' />
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
                            <Form.Control disabled={this.state.is_solar} type="datetime-local" placeholder="Deadline" ref='deadline' />
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
                        <Form.Check disabled={this.state.is_solar} type="checkbox" label="Flexible Asset" name='isFlexible' id="isFlexible" ref='flexible' value='flexible' />
                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset able to be used in a flexible manner? (ie. charging and usage can be shifted in time)</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                            </span>
                        </OverlayTrigger>
                    </Form.Row>
                    <Form.Row>
                        <Form.Check type="checkbox" label="Available Asset" name='isAvailable' id="isAvailable" ref='available' value='available' />
                        <OverlayTrigger placement='auto' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset in an available state for use? (ie. to recieve a charge or to pull energy from)</Tooltip>}>
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