import React from "react";
import { Container } from "react-bootstrap";
import '../App.css';

import UsersList from '../UsersList';
import UserCreateUpdate from '../UserCreateUpdate';

import AssetsList from '../AssetsList';
import AssetsListByUser from '../AssetsListByUser';
import AssetCreateUpdate from '../AssetCreateUpdate';

import Distributor from '../Distributor';
import About from '../About';

import TransactionsList from '../TransactionsList';
import TransactionCreateUpdate from '../TransactionCreateUpdate';

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
    </Switch>
  </Container>
)

export default BaseContent;
