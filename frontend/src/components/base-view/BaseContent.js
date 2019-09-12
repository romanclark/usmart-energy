import React from "react";
import { Container } from "react-bootstrap";

import UsersList from '../user-view/UsersList';
import UserCreateUpdate from '../user-view/UserCreateUpdate';

import AssetsList from '../assets/AssetsList';
import AssetsListByUser from '../assets/AssetsListByUser';
import AssetCreateUpdate from '../assets/AssetCreateUpdate';

import Distributor from '../operator-view/Distributor';
import About from './About';

import TransactionsList from '../operator-view/TransactionsList';
import TransactionCreateUpdate from '../operator-view/TransactionCreateUpdate';

import CallbackPage from '../auth/callback'
import Profile from './Profile'

import { Route, Switch } from 'react-router-dom';

const BaseContent = () => (
  <Container className="flex-grow-1 mt-5">
    <Switch>
      <Route path="/personal/:user_id" exact component={AssetsListByUser} />
      <Route path="/assets/" exact component={AssetsList} />
      <Route path="/assets/:asset_id" exact component={AssetCreateUpdate} />
      <Route path="/asset/:user_id" exact component={AssetCreateUpdate} />

      <Route path="/distributor/" exact component={Distributor} />
      <Route path="/users/" exact component={UsersList} />
      <Route path="/users/:user_id" exact component={UserCreateUpdate} />
      <Route path="/user/" exact component={UserCreateUpdate} />

      <Route path="/transactions/" exact component={TransactionsList} />
      <Route path="/transactions/:transaction_id" exact component={TransactionCreateUpdate} />
      <Route path="/transaction/" exact component={TransactionCreateUpdate} />
      <Route path="/about-us" exact component={About} />

      <Route path="/profile" exact component={Profile}/>
      <Route path="/callback" exact component={CallbackPage}/>
    </Switch>
  </Container>
)

export default BaseContent;
