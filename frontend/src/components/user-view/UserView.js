import React, { Component } from 'react';

class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // var self = this;
    }

    render() {
        return (
            <div className="user--view">
                <p className="page-title">User/Homeowner View</p>
                {/* TODO should grab user id (and address and all that?) here and pass to each of the components as needed? */}
                {/* <UserMonthlyStats></UserMonthlyStats> */}
                {/* <UserAssets></UserAssets> */}
                {/* <UserMap></UserMap> */}
            </div>
        );
    }
}
export default UserView;