import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaUser, FaBolt } from 'react-icons/fa';

import UserMonthlyStats from './UserMonthlyStats';
import MapOfUser from './MapOfUser';
import UserAssets from './UserAssets';

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
        // grabbing user id from the parameters, 
        // currently assigned in BaseContent.js with the : colon operator
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
        var hey = "hey";
        return (
            <div className="user--view container">
                <p className="page-title">Homeowner View</p>
                <Container>
                    <Row>
                        <Col>
                            {/* TODO add in the user stats */}
                            {/* <p>User monthly stats</p> */}
                            {/* pass relevant user info here */}
                            {/* <UserMonthlyStats></UserMonthlyStats> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <p className="page-subtitle">My Profile</p>
                            <p>Name: {this.state.first_name} {this.state.last_name}</p>
                            <p>Address: {this.state.street}, {this.state.city}, {this.state.state}, {this.state.zipcode}</p>
                            <p>Number of asssets: {this.state.numAssets}</p>
                            <Button variant="outline-secondary" href={"/users/" + this.state.user_id}><FaUser /> Edit My Account</Button>
                            <Button variant="outline-secondary" href={"/asset/" + this.state.user_id}>Add A New Asset <FaBolt /></Button>
                        </Col>
                        <Col className="wrapper">
                            <MapOfUser></MapOfUser>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <p>My Assets</p>
                            <p>Add a new asset</p>
                            {/* <UserAssets user_id={this.state.user_id}></UserAssets> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default UserView;