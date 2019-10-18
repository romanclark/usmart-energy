import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Loading from '../base-view/Loading';

import AssetsService from './AssetsService';
const assetsService = new AssetsService();

class AssetCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toPersonal: false,
            toHomeowner: false,
            is_solar: false,
            loading: false,
            nickname: null,
            asset_class: null,
            power: null,
            energy: null,
            capacity: null,
            flexible: false,
            deadline: null,
            available: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateValues = this.populateValues.bind(this);
        this.handleAssetClassChange = this.handleAssetClassChange.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            this.setState({ loading: true });
            assetsService.getAsset(params.asset_id, this.props.token).then((a) => {
                if (a.asset_class === "Solar Panel") {
                    this.setState({ is_solar: true });
                }
                this.setState({
                    nickname: a.nickname,
                    asset_class: a.asset_class,
                    power: a.power,
                    energy: a.energy,
                    capacity: a.capacity,
                    flexible: a.flexible,
                    deadline: a.user_deadline,
                    available: a.available
                })
            }).then(() => {
                this.setState({ loading: false });
                this.populateValues();
            }).catch((error) => {
                console.error(error);
                alert(error);
                this.setState({ loading: false });
                this.populateValues();
            });
        }
    }

    handleCreate(user_id) {
        if (this.refs.asset_class.value === "Select...") {
            alert(new Error("You must select an asset class!"));
            return;
        }
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
        if (this.refs.asset_class.value === "Select...") {
            alert(new Error("You must select an asset class!"));
            return;
        }
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

    populateValues() {
        if (this.state.nickname) {
            this.refs.nickname.value = this.state.nickname;
            this.refs.asset_class.value = this.state.asset_class;
            this.refs.power.value = this.state.power;
            this.refs.energy.value = this.state.energy;
            this.refs.capacity.value = this.state.capacity;
            this.refs.flexible.checked = this.state.flexible;
            this.refs.deadline.value = this.state.deadline;
            this.refs.available.checked = this.state.available;
        }
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
            <div className="container form-group">
                {!this.props.token ? <Redirect to="/404" /> : <div></div>}
                {this.state.loading ? (
                    <div className="wrapper">
                        <Loading type="spinner"></Loading>
                    </div>
                ) : (
                        <div className="wrapper update-form">
                            <p className="page-title">{this.state.nickname ? "Update My Asset" : "Create New Asset"}</p>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Nickname:</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">An easy to recognize name for your Asset</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        <Form.Control ref='nickname' />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Asset Class:</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The type of Asset you have</Tooltip>}>
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
                                        <Form.Label>Power In/Out Per Hour (kW):</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The amount of energy produced/consumed per hour</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        <Form.Control type="number" step="0.01" ref='power' />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Current Energy (kWh):</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The current level of avaliable energy</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        <Form.Control type="number" step="0.01" ref='energy' />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Total Capacity: (kWh)</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">The maximum capacity of energy</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        <Form.Control disabled={this.state.is_solar} type="number" step="0.01" ref='capacity' />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Deadline Time and Date:</Form.Label>
                                        <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">When do you want your deviced charged by?</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                            </span>
                                        </OverlayTrigger>
                                        <Form.Control disabled={this.state.is_solar} type="datetime-local" ref='deadline' />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Check disabled={this.state.is_solar} type="checkbox" label="Flexible energy demand" name='isFlexible' id="isFlexible" ref='flexible' value='flexible' />
                                    <OverlayTrigger className="info-bubble" placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset able to be used in a flexible manner? (ie. charging and usage can be shifted in time)</Tooltip>}>
                                        <span className="d-inline-block">
                                            <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                        </span>
                                    </OverlayTrigger>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Check type="checkbox" label="Currently available to give/recieve energy" name='isAvailable' id="isAvailable" ref='available' value='available' />
                                    <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Is this asset in an available state for use? (ie. to recieve a charge or to pull energy from)</Tooltip>}>
                                        <span className="d-inline-block">
                                            <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="warning">?</Button>
                                        </span>
                                    </OverlayTrigger>
                                </Form.Row>

                                <Button className="top-margin" variant="dark" type="submit">{this.state.nickname ? "Update" : "Create"}</Button>
                            </Form>
                        </div>
                    )}
            </div>
        );
    }
}
export default AssetCreateUpdate;