import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Loading from '../base-view/Loading';
import Notification from '../reuseable/Notification';

import AssetsService from './AssetsService';
const assetsService = new AssetsService();

class AssetCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_update: false,
            toPersonal: false,
            toHomeowner: false,
            is_solar: false,
            is_solar_battery: false,
            loading: false,
            nickname: null,
            asset_class: null,
            power: null,
            energy: null,
            capacity: null,
            flexible: false,
            deadline: null,
            available: false,
            popupTitle: null,
            popupText: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateValues = this.populateValues.bind(this);
        this.handleAssetClassChange = this.handleAssetClassChange.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.asset_id) {
            this.setState({ loading: true });
            assetsService.getAsset(params.asset_id, this.props.token).then((a) => {
                if (a.asset_class === "Solar Panel") {
                    this.setState({ is_solar: true });
                }
                else if (a.asset_class === "Solar Panel with Battery") {
                    this.setState({ is_solar_battery: true });
                }
                this.setState({
                    is_update: true,
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
            }).catch(() => {
                this.setState({
                    loading: false
                });
                this.populateValues();
            });
        }
    }

    handleCreate(user_id) {
        if (this.refs.asset_class.value === "Select...") {
            this.setState({
                popupTitle: "Error!",
                popupText: "You must select an asset class!"
            });
            return;
        }
        if (this.refs.deadline.value && !this.state.is_solar && !this.state.is_solar_battery) {
            var deadline = new Date(this.refs.deadline.value);
            var today = new Date();
            if (deadline < today) {
                this.setState({
                    popupTitle: "Error!",
                    popupText: "You must select a deadline in the future!"
                });
                return;
            }
        }

        // set default values for solar or solar w/ battery
        if (this.state.is_solar) {
            this.refs.deadline.value = "2000-01-01T00:00";
            this.refs.capacity.value = 0;
            this.refs.flexible.checked = false;
        }
        else if (this.state.is_solar_battery) {
            this.refs.deadline.value = "2000-01-01T00:00";
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
        ).then(() => {
            this.setState({ toHomeowner: true });
        }).catch((e) => {
            console.error(e);
            this.setState({
                popupTitle: "Error!",
                popupText: "There was an error creating your asset! Please re-check your form."
            });
        },
            error => {
                console.error(error);
            }
        );
    }

    handleUpdate(asset_id) {
        if (this.refs.asset_class.value === "Select...") {
            this.setState({
                popupTitle: "Error!",
                popupText: "You must select an asset class!"
            });
            return;
        }
        if (this.refs.deadline.value) {
            var deadline = new Date(this.refs.deadline.value);
            var today = new Date();
            if (deadline < today) {
                this.setState({
                    popupTitle: "Error!",
                    popupText: "You must select a deadline in the future!"
                });
                return;
            }
        }
        if (this.refs.asset_class.value === "Select...") {
            this.setState({
                popupTitle: "Error!",
                popupText: "You must select an asset class!"
            });
            return;
        }

        // set default values for solar or solar w/ battery
        if (this.state.is_solar) {
            this.refs.deadline.value = "2000-01-01T00:00";
            this.refs.capacity.value = 0;
            this.refs.flexible.checked = false;
        }
        else if (this.state.is_solar_battery) {
            this.refs.deadline.value = "2000-01-01T00:00";
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
                this.setState({ toHomeowner: true })
            }).catch(() => {
                this.setState({
                    popupTitle: "Error!",
                    popupText: "There was an error updating your asset! Please re-check your form."
                });
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

        // set and hide some inputs depending on the asset class
        if (this.refs.asset_class.value === "Solar Panel") {
            this.setState({ is_solar: true, is_solar_battery: false });
        }
        else if (this.refs.asset_class.value === "Solar Panel with Battery") {
            this.setState({ is_solar: false, is_solar_battery: true });
        }
        else {
            this.setState({ is_solar: false, is_solar_battery: false });
            if (this.refs.capacity) {
                this.refs.capacity.value = null;
                this.refs.deadline.value = null;
                this.refs.flexible.checked = false;
            }
        }
    }

    // Was a fix for a iOS datepicker problem. More info at:
    // https://stackoverflow.com/questions/43747521/mobile-safari-10-3-1-datetime-local-enter-a-valid-value-error/46393100
    removeSecondsFromInputDate(event) {
        event.target.value = event.target.value.substr(0, 16)
    }

    handleCloseNotification() {
        this.setState({
            popupTitle: null,
            popupText: null
        });
    }

    render() {
        if (this.state.toHomeowner === true) {
            return <Redirect to={'/'} />
        }
        var pageTitle = "";
        // if updating
        if (this.state.nickname) {
            pageTitle = "Update My " + this.state.asset_class;
        }
        // if creating
        else {
            this.refs.asset_class && !this.refs.asset_class.value.includes("Select") ? pageTitle = "Create New " + this.refs.asset_class.value : pageTitle = "Create New Asset";
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
                            {this.state.popupTitle ?
                                <Notification
                                    title={this.state.popupTitle}
                                    message={this.state.popupText}
                                    handleCloseNotification={() => this.handleCloseNotification()}
                                    show={this.state.popupTitle}
                                    color="rgba(216,0,12,0.2)">
                                </Notification> : null}
                            <p className="page-title">{pageTitle}</p>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Row>
                                    <Form.Group as={Col} lg="6">
                                        <Form.Label>Asset Class:</Form.Label>
                                        <Form.Control disabled={this.state.is_update} onChange={this.handleAssetClassChange} as="select" ref='asset_class'>
                                            <option>Select...</option>
                                            <option>Electric Vehicle</option>
                                            <option>Solar Panel</option>
                                            <option>Solar Panel with Battery</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} lg="6">
                                        <Form.Label>Nickname:</Form.Label>
                                        <Form.Control ref='nickname' />
                                    </Form.Group>
                                </Form.Row>

                                {/* show the rest of the form once they select asset type */}
                                {this.refs.asset_class && !this.refs.asset_class.value.includes("Select") ?
                                    <div>
                                        <Form.Row className={this.refs.asset_class.value.includes("Electric") ? "deadline-enabled" : "deadline-disabled"}>
                                            <Form.Group as={Col}>
                                                <Form.Label>Charging Deadline:</Form.Label>
                                                <OverlayTrigger
                                                    placement='top-start'
                                                    trigger={['click', 'hover', 'focus']}
                                                    overlay={
                                                        <Tooltip id="tooltip-disabled">When do you want your device charged by?</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="light">?</Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <Form.Control
                                                    onChange={this.removeSecondsFromInputDate}
                                                    disabled={this.state.is_solar || this.state.is_solar_battery}
                                                    type="datetime-local"
                                                    ref='deadline' />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>{this.refs.asset_class.value === "Electric Vehicle" ? "Hourly Charger Power:" : "Peak kWs Installed:"}</Form.Label>
                                                <OverlayTrigger
                                                    placement='top-start'
                                                    trigger={['click', 'hover', 'focus']}
                                                    overlay={
                                                        <Tooltip id="tooltip-disabled">
                                                            {this.refs.asset_class.value === "Electric Vehicle" ? "Amount of energy consumed per hour" : "Amount of energy produced per hour"}
                                                        </Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="outline-secondary">?</Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <Form.Control type="number" step="0.1" ref='power' />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Current Charge (kWh):</Form.Label>
                                                <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Current energy level</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="outline-secondary">?</Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <Form.Control type="number" step="0.1" ref='energy' />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Total Capacity: (kWh)</Form.Label>
                                                <OverlayTrigger placement='top-start' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">Maximum energy capacity</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="outline-secondary">?</Button>
                                                    </span>
                                                </OverlayTrigger>
                                                <Form.Control disabled={this.state.is_solar} type="number" step="0.1" ref='capacity' />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Check
                                                disabled={this.state.is_solar}
                                                type="checkbox"
                                                label="Flexible energy demand"
                                                name='isFlexible'
                                                id="isFlexible"
                                                ref='flexible'
                                                value='flexible' />
                                            <OverlayTrigger
                                                className="info-bubble"
                                                placement='top-start'
                                                trigger={['click', 'hover', 'focus']}
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                        {this.refs.asset_class.value === "Electric Vehicle" ? "Can this demand for energy be shifted to a later time?" : "Can the energy be disributed at a later time?"}
                                                    </Tooltip>}>
                                                <span className="d-inline-block">
                                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="outline-secondary">?</Button>
                                                </span>
                                            </OverlayTrigger>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Check
                                                type="checkbox"
                                                label={this.refs.asset_class.value === "Electric Vehicle" ? "Currently available to recieve energy" : "Currently available to give energy"}
                                                name='isAvailable'
                                                id="isAvailable"
                                                ref='available'
                                                value='available' />
                                            <OverlayTrigger
                                                placement='top-start'
                                                trigger={['click', 'hover', 'focus']}
                                                overlay={
                                                    <Tooltip id="tooltip-disabled">
                                                        {this.refs.asset_class.value === "Electric Vehicle" ? "Is it available to recieve a charge?" : "Is it available to send energy?"}
                                                    </Tooltip>}>
                                                <span className="d-inline-block">
                                                    <Button disabled style={{ pointerEvents: 'none' }} size="sm" variant="outline-secondary">?</Button>
                                                </span>
                                            </OverlayTrigger>
                                        </Form.Row>

                                        <Button className="top-margin" variant="dark" type="submit">{this.state.nickname ? "Update" : "Create"}</Button>

                                    </div> : null}
                            </Form>
                        </div>
                    )}
            </div>
        );
    }
}
export default AssetCreateUpdate;