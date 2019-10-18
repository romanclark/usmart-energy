import React from "react";
import { Route, Switch } from 'react-router-dom';

import UserView from '../user-view/UserView';
import OperatorView from '../operator-view/OperatorView';
import AssetCreateUpdate from '../assets/AssetCreateUpdate';
import UserCreateUpdate from '../user-view/UserCreateUpdate';
import HomePage from "./Home";
import About from './About';
import Error404 from './Error404';
import CallbackPage from '../auth/callback'
import { AuthConsumer } from '../auth/authContext';
import VerifyUser from "../auth/verifyUser";

const BaseContent = () => (
  <AuthConsumer>
    {({ accessToken, user }) => (
      <div>
        {console.log(user)}
        <Switch>
          <Route path="/homeowner/" render={(props) => <UserView {...props} token={accessToken} user={user} />} />
          <Route path="/operator/" exact component={OperatorView} />

          <Route path="/asset/" render={(props) => <AssetCreateUpdate {...props} token={accessToken} user_id={user.id} />} />
          <Route path="/assets/:asset_id" render={(props) => <AssetCreateUpdate {...props} token={accessToken} />} />

          <Route path="/updateuser/" render={(props) => <UserCreateUpdate {...props} token={accessToken} update={true} user={user} />} />
          <Route path="/user/" render={(props) => <UserCreateUpdate {...props} token={accessToken} update={false} user={user} />} />

          <Route path="/" render={(props) => <HomePage {...props} token={accessToken} user={user} />} />
          <Route path="/about-us" exact component={About} />
          <Route path="/404" render={(props) => <Error404 {...props} token={accessToken} />} />
          <Route path="/callback" exact component={CallbackPage} />Î
          <Route path="/verifyuser" render={(props) => <VerifyUser {...props} token={accessToken} user={user} loading={false} />} />
        </Switch>
      </div>
    )}
  </AuthConsumer>
)

export default BaseContent;
