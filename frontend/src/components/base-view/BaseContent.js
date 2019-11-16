import React from "react";
import { Route, Switch } from 'react-router-dom';

import { AuthConsumer } from '../auth/authContext';
import AssetCreateUpdate from '../assets/AssetCreateUpdate';
import UserUpdate from '../user-view/UserUpdate';
import UserView from '../user-view/UserView';
import OperatorView from '../operator-view/OperatorView';
import HomePage from "./Home";
import About from './About';
import Error404 from './Error404';
import CallbackPage from '../auth/callback'
import VerifyUser from "../auth/verifyUser";

const BaseContent = () => (
  <AuthConsumer>
    {({ accessToken, user }) => (
      <div>
        <Switch>
          <Route path="/asset/" render={(props) => <AssetCreateUpdate {...props} token={accessToken} user_id={user.id} />} />
          <Route path="/assets/:asset_id" render={(props) => <AssetCreateUpdate {...props} token={accessToken} />} />
          <Route path="/updateuser/" render={(props) => <UserUpdate {...props} token={accessToken} update={true} user={user} />} />
          <Route path="/user/" render={(props) => <UserUpdate {...props} token={accessToken} update={false} user={user} />} />
          <Route path="/homeowner/" render={(props) => <UserView {...props} token={accessToken} user_id={user.id} />} />
          <Route path="/operator/" render={(props) => <OperatorView {...props} accessToken={accessToken}  />} />
          <Route path="/" exact component={HomePage} />
          <Route path="/about-us" exact component={About} />
          <Route path="/about-us" render={(props) => <About {...props} user={user} />} />
          <Route path="/404" render={(props) => <Error404 {...props} token={accessToken} />} />
          <Route path="/callback" exact component={CallbackPage} />
          <Route path="/verifyuser" exact component={VerifyUser} />
        </Switch>
      </div>
    )}
  </AuthConsumer>
)

export default BaseContent;
