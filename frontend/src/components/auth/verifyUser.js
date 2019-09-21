import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./authContext";
import UsersService from '../user-view/UsersService';
import Loading from '../base-view/Loading';
import history from '../../utils/history';

const usersService = new UsersService();

const VerifyUser = () => (
    <AuthConsumer>
        {({ user, accessToken, loading }) => {
            if (!user || loading) {
                return <Loading />
            }
            usersService.getUser(user.id, accessToken).then((result) => {
                history.push('/');
            }).catch((e) => {
                console.error(e);
                history.push('/user/');
            },
                error => {
                    console.error(error);
                }
            );
        }}
    </AuthConsumer>
);

export default VerifyUser;