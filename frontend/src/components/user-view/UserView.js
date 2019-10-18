import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import UserName from './UserName';
import UserInfo from './UserInfo';
// import UserOverallStats from './UserOverallStats';
import MapOfUser from './MapOfUser';
import UserMonthlyStats from './UserMonthlyStats';
import UserAssetsScrollable from './UserAssetsScrollable';
import AllUserTransactions from './AllUserTransactions';
import { AuthConsumer } from '../auth/authContext';
import Can from "../auth/Can";
import Loading from '../base-view/Loading';

import UsersService from './UsersService';
import AssetsService from '../assets/AssetsService';
import TransactionsService from '../operator-view/TransactionsService';

const usersService = new UsersService();
const assetsService = new AssetsService();
const transactionsService = new TransactionsService();

class UserView extends Component {

    constructor(props) {
        super(props);

        // bind functions
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserAssets = this.getUserAssets.bind(this);
        this.getUserTransactions = this.getUserTransactions.bind(this);

        // set state
        this.state = {
            loading: true,
            assets: [],
            transactions: [],
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
        };
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.getUserInfo(this.props.user.id, this.props.token);
            this.getUserAssets(this.props.user.id, this.props.token);
            this.getUserTransactions(this.props.user.id, this.props.token);
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
                assets: result.data
            });
        })
    }

    getUserTransactions(user_id, token) {
        var self = this;
        transactionsService.getUserTransactions(user_id, token).then((result) => {
            self.setState({
                transactions: result.data,
                loading: false
            });
        })
    }

    render() {
        return (
            <AuthConsumer>
                {({ user }) => (
                    <Can
                        role={user.role}
                        perform="homeowner-pages:visit"
                        yes={
                            () =>
                                <div className="container">
                                    {console.log(user)}
                                    <div>
                                        {this.state.loading ? (
                                            <div>
                                                <Loading type="spinner-homeowner"></Loading>
                                            </div>
                                        ) : (
                                                <Container className="container">
                                                    <Row>
                                                        <Col className="user-name-wrapper" lg="7">
                                                            <UserName
                                                                firstName={this.state.first_name}
                                                                lastName={this.state.last_name}
                                                                email={this.state.email}
                                                                street={this.state.street}
                                                                city={this.state.city}
                                                                zipcode={this.state.zipcode}>
                                                            </UserName>
                                                        </Col>
                                                        <Col className="wrapper">
                                                            <UserInfo
                                                                userEVs={this.state.assets.filter(a => a.asset_class === "Electric Vehicle")}
                                                                userSolars={this.state.assets.filter(a => a.asset_class === "Solar Panel")}
                                                                userSolarBatteries={this.state.assets.filter(a => a.asset_class === "Solar Panel with Battery")}
                                                                localTransactions={this.state.transactions.filter(t => t.is_with_grid === false)}
                                                                gridTransactions={this.state.transactions.filter(t => t.is_with_grid === true)}>
                                                            </UserInfo>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="wrapper">
                                                            {/* <UserOverallStats></UserOverallStats> */}
                                                            <UserMonthlyStats
                                                                token={this.props.token}
                                                                user_id={this.state.user_id}>
                                                            </UserMonthlyStats>
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
                                                            <UserAssetsScrollable
                                                                token={this.props.token}
                                                                user_id={this.props.user.id}
                                                                first_name={this.state.first_name}
                                                                assets={this.state.assets}>
                                                            </UserAssetsScrollable>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="bottom wrapper">
                                                            <AllUserTransactions
                                                                transactions={this.state.transactions}
                                                                token={this.props.token}
                                                                user_id={this.props.user.id}>
                                                            </AllUserTransactions>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            )}
                                    </div>
                                </div>
                        }
                        no={() =>
                            <div>
                                {console.log("hey from userView 'no' case. Your user is: ")}
                                {console.log(user)}
                                <Redirect to="/404" />
                            </div>
                        }
                    />
                )}
            </AuthConsumer>
        );
    }
}
export default UserView;
