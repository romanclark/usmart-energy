import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { Redirect } from "react-router-dom";

import UserMonthlyStats from './UserMonthlyStats';
import MapOfUser from './MapOfUser';
// import UserAssets from './UserAssets';
import UserAssetsScrollable from './UserAssetsScrollable';

import user_icon from '../../images/user_icon.jpg'

import UsersService from './UsersService';
import AssetsService from '../assets/AssetsService';

const usersService = new UsersService();
const assetsService = new AssetsService();

class UserView extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserAssets = this.getUserAssets.bind(this);

        // set state
        this.state = {
            user_id: null,
            first_name: null,
            last_name: null,
            email: null,
            street: null,
            city: null,
            state: null,
            zipcode: null,
            latitude: null,
            longitude: null,
            numAssets: 0
        };
    }

    componentDidMount() {
        if (this.props.user_id) {
            this.getUserInfo(this.props.user_id, this.props.token);
            this.getUserAssets(this.props.user_id, this.props.token);
        }
    }

    getUserInfo(user_id, token) {
        var self = this;
        usersService.getUser(user_id, token).then((result) => {
            self.setState({
                user_id: result.user_id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                street: result.street,
                city: result.city,
                state: result.state,
                zipcode: result.zipcode,
                latitude: result.latitude,
                longitude: result.longitude
            })
        })
    }

    getUserAssets(user_id, token) {
        var self = this;
        assetsService.getAssetsByUser(user_id, token).then((result) => {
            self.setState({
                numAssets: result.count
            })
        })
    }

    render() {
        return (
            <div className="user--view container">
                {!this.props.token ? <Redirect to="/404" /> : <div>
                    <p className="page-title">Homeowner View
                    {/* <OverlayTrigger placement='top' trigger={['click', 'hover', 'focus']} overlay={<Tooltip id="tooltip-disabled">As a homeowner, you can adjust your assets and their preferences here</Tooltip>}>
                            <span className="d-inline-block">
                                <Button style={{ pointerEvents: 'none' }} size="sm">?</Button>
                            </span>
                        </OverlayTrigger> */}
                    </p>
                    <Container>
                        <Row>
                            <Col className="wrapper">
                                <p className="page-subtitle">My Profile</p>
                                <div className="profile-fields-wrapper">
                                    <div className="profile-picture-wrapper">
                                        <img className="profile-picture" src={user_icon} alt="user" />
                                    </div>
                                    <div><p>Name:</p>
                                        <div className="profile-field">
                                            {this.state.first_name} {this.state.last_name}
                                        </div>
                                    </div>
                                    <div><p>Address:</p>
                                        <div className="profile-field">
                                            {this.state.street}<br />{this.state.city}, {this.state.state}<br />{this.state.zipcode}
                                        </div>
                                    </div>
                                    <div><p>Number of Assets:</p>
                                        <div className="profile-field">
                                            {this.state.numAssets}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-buttons-wrapper">
                                    <LinkContainer to={"/updateuser/"}>
                                        <Button variant="outline-secondary"><FaUser /> Edit My Account</Button>
                                    </LinkContainer>
                                    {/* <LinkContainer to={"/asset/" + this.state.user_id}>
                                        <Button variant="outline-secondary">Add A New Asset <FaBolt /></Button>
                                    </LinkContainer> */}
                                </div>
                            </Col>
                            <Col className="wrapper">
                                <MapOfUser
                                    token={this.props.token}
                                    user_latitude={parseFloat(this.state.latitude, 10)}
                                    user_longitude={parseFloat(this.state.longitude, 10)}>
                                </MapOfUser>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="wrapper">
                                <UserMonthlyStats
                                    token={this.props.token}
                                    user_id={this.state.user_id}>
                                </UserMonthlyStats>
                            </Col>
                        </Row>

                        {/* <Row>
                                    <Col className="wrapper">
                                        <UserAssets
                                            token={this.props.token}
                                            user_id={this.props.user_id}
                                            first_name={this.state.first_name}>
                                        </UserAssets>
                                    </Col>
                                </Row> */}

                        <Row>
                            <Col className="bottom wrapper">
                                <UserAssetsScrollable
                                    token={this.props.token}
                                    user_id={this.props.user_id}
                                    first_name={this.state.first_name}>
                                </UserAssetsScrollable>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </div>
        );
    }
}
export default UserView;