import React, { Component } from 'react';
import UsersService from './UsersService';
import { Container, Row, Col } from 'react-bootstrap';

import UserMonthlyStats from './UserMonthlyStats';
import MapOfUser from './MapOfUser';
import UserAssets from './UserAssets';

class UserView extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.getUserInfo = this.getUserInfo.bind(this);

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
            longitude: null
        };
    }

    componentDidMount() {
        var self = this;
        // TODO should grab user id from the parameters!!! and call getUserInfo
    }

    getUserInfo(user_id) {
        var self = this;
        UsersService.getUser(user_id).then(function (result) {
            console.log(result);
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

    render() {
        return (
            <div className="user--view container">
                <p className="page-title">Homeowner View</p>
                <Container>
                    <Row>
                        <Col>
                            <p>User monthly stats</p>
                            {/* TODO pass relevant user info here */}
                            {/* <UserMonthlyStats></UserMonthlyStats> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <p>My profile</p>
                            <p>Name:</p>
                            <p>Address:</p>
                            <p>Number of asssets:</p>
                            <p>Edit your profile</p>
                        </Col>
                        <Col className="wrapper">
                            <MapOfUser></MapOfUser>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="wrapper">
                            <p>My assets</p>
                            <p>Add a new asset</p>
                            {/* <UserAssets></UserAssets> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default UserView;