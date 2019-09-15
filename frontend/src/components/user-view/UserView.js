import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaUser, FaBolt } from 'react-icons/fa';

import UserMonthlyStats from './UserMonthlyStats';
import MapOfUser from './MapOfUser';
import UserAssets from './UserAssets';

import user_icon from '../../images/user_icon.jpg'
// import connie from '../../images/connie.png'

import UsersService from './UsersService';
import AssetsService from '../assets/AssetsService';

const usersSerice = new UsersService();
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
        var self = this;
        // TODO grabbing user id from the parameters, currently assigned in BaseContent.js with the : colon operator
        const { match: { params } } = self.props;
        self.getUserInfo(params.user_id);
        self.getUserAssets(params.user_id);
    }

    getUserInfo(user_id) {
        var self = this;
        usersSerice.getUser(user_id).then(function (result) {
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

    getUserAssets(user_id) {
        var self = this;
        assetsService.getAssetsByUser(user_id).then(function (result) {
            self.setState({
                numAssets: result.count
            })
        })
    }

    render() {
        return (
            <div className="user--view container">
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
                                <Button variant="outline-secondary" href={"/users/" + this.state.user_id}><FaUser /> Edit My Account</Button>
                                <Button variant="outline-secondary" href={"/asset/" + this.state.user_id}>Add A New Asset <FaBolt /></Button>
                            </div>
                        </Col>
                        <Col className="wrapper">
                            <MapOfUser 
                                latitude={this.state.latitude}
                                longitude={this.state.longitude}
                            ></MapOfUser>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="wrapper">
                            <UserMonthlyStats
                                user_id={this.state.user_id}>
                            </UserMonthlyStats>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="wrapper">
                            <UserAssets
                                user_id={this.state.user_id}
                                first_name={this.state.first_name}>
                            </UserAssets>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default UserView;