import React, { Component } from 'react';
import UsersService from './UsersService';

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
        // var self = this;
    }

    getUserInfo(userId) {
        var self = this;
        UsersService.getUser(userId).then(function (result) {
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
            <div className="user--view">
                <p className="page-title">Homeowner View</p>
                {/* TODO should grab user id (and address and all that?) here and pass to each of the components as needed? */}
                <div className="wrapper">
                    {/* <UserMonthlyStats></UserMonthlyStats> */}
                </div>
                <div className="wrapper">
                    {/* <UserAssets></UserAssets> */}
                </div>
                <div className="wrapper">
                    {/* <UserMap></UserMap> */}
                </div>
            </div>
        );
    }
}
export default UserView;