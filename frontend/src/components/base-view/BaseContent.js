import React from "react";
// import { Container } from "react-bootstrap";

import UsersList from '../operator-view/UsersList';
import UserCreateUpdate from '../user-view/UserCreateUpdate';

import AssetsList from '../assets/AssetsList';
import AssetsListByUser from '../user-view/AssetsListByUser';
import AssetCreateUpdate from '../assets/AssetCreateUpdate';

import Distributor from '../operator-view/Distributor';
// import HomePage from "./Home";
import About from './About';

import OperatorView from '../operator-view/OperatorView';
import UserView from '../user-view/UserView';
import TransactionCreateUpdate from '../operator-view/TransactionCreateUpdate';

import CallbackPage from '../auth/callback'
import { AuthConsumer } from '../auth/authContext';
import Profile from './Profile';

import { Route, Switch } from 'react-router-dom';
import TransactionsList from "../operator-view/TransactionsList";

const BaseContent = () => (
  <AuthConsumer>
    {({ accessToken }) => (
      // <Container className="flex-grow-1 mt-5">
      <div>
        <Switch>
          <Route path="/personal/:user_id" render={(props) => <AssetsListByUser {...props} token={accessToken} />} />
          <Route path="/asset/:user_id" render={(props) => <AssetCreateUpdate {...props} token={accessToken} />} />
          <Route path="/assets/:asset_id" render={(props) => <AssetCreateUpdate {...props} token={accessToken} />} />
          <Route path="/assets/" render={(props) => <AssetsList {...props} token={accessToken} />} />

          <Route path="/distributor/" render={(props) => <Distributor {...props} token={accessToken} />} />
          <Route path="/users/:user_id" render={(props) => <UserCreateUpdate {...props} token={accessToken} />} />
          <Route path="/users/" render={(props) => <UsersList {...props} token={accessToken} />} />
          <Route path="/user/" render={(props) => <UserCreateUpdate {...props} token={accessToken} />} />

          <Route path="/homeowner/:user_id" render={(props) => <UserView {...props} token={accessToken} />} />
          <Route path="/operator/" exact component={OperatorView} />

          {/* <Route path="/transactions/:transaction_id" render={(props) => <TransactionCreateUpdate {...props} token={accessToken} />} /> */}
          <Route path="/transactions/" render={(props) => <TransactionsList {...props} token={accessToken} />} />
          <Route path="/transaction/" render={(props) => <TransactionCreateUpdate {...props} token={accessToken} />} />
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/about-us" exact component={About} />

          <Route path="/profile" exact component={Profile} />
          <Route path="/callback" exact component={CallbackPage} />
        </Switch>
      </div>
      // </Container>
    )}
  </AuthConsumer>
)

export default BaseContent;
