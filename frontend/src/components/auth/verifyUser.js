import React from "react";

import { AuthConsumer } from "./authContext";
import UsersService from '../user-view/UsersService';
import Loading from '../base-view/Loading';
import history from '../../utils/history';

const usersService = new UsersService();

const VerifyUser = () => (
    <AuthConsumer>
        {({ user, accessToken, loading }) => {
            console.log("hey from verifyUser");
            console.log(user);
            if (!user || loading) {
                return <Loading type="spinner"></Loading>
            }
            usersService.getUser(user.id, accessToken).then((result) => {
                // LOGGED IN
                console.log(result);
                history.push('/'); // takes to Home.js homepage, which will navigate to either user type
            }).catch((e) => {
                // NO USER EXISTED, NOT LOGGED IN
                console.error(e);
                history.push('/user/'); // goes to create user page
            },
                error => {
                    console.error(error);
                }
            );
        }}
    </AuthConsumer>
);

export default VerifyUser;
