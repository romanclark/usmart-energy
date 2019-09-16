import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./authContext";
import UsersService from '../user-view/UsersService';
import Loading from '../base-view/Loading';

const usersService = new UsersService();

const VerifyUser = () => (
    <AuthConsumer>
        {({ user, accessToken, loading }) => {
            var verified = false;
            if (!user || loading) {
                return <Loading/>
            }
            // console.log(user);
            const id = String(user.id).split("|")[1];
            // console.log(id);
            // console.log(accessToken);
            usersService.getUser(parseInt(id), accessToken).then((result) => {
                verified = true;
            })
            if (verified) {
                return <Redirect to="/"/>;
            }
            return <Redirect to="/user/"/>;
        }}
    </AuthConsumer>
);

export default VerifyUser;