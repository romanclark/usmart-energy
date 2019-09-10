import React from "react";
import { Container } from "react-bootstrap";

import UsersList from '../operator-view/UsersList';
import UserCreateUpdate from '../user-view/UserCreateUpdate';

import AssetsList from '../assets/AssetsList';
import AssetsListByUser from '../user-view/AssetsListByUser';
import AssetCreateUpdate from '../assets/AssetCreateUpdate';

import Distributor from '../operator-view/Distributor';
import About from './About';

import OperatorView from '../operator-view/OperatorView';
import UserView from '../user-view/UserView';
import TransactionCreateUpdate from '../operator-view/TransactionCreateUpdate';

import { Route, Switch } from 'react-router-dom';
import TransactionsList from "../operator-view/TransactionsList";

const BaseContent = () => (
  // <Container className="flex-grow-1 mt-5">
  <Container>
    <Switch>
      <Route path="/personal/:user_id" exact component={AssetsListByUser} />
      <Route path="/assets/" exact component={AssetsList} />
      <Route path="/assets/:asset_id" exact component={AssetCreateUpdate} />
      <Route path="/asset/:user_id" exact component={AssetCreateUpdate} />

      <Route path="/distributor/" exact component={Distributor} />
      <Route path="/users/" exact component={UsersList} />
      <Route path="/users/:user_id" exact component={UserCreateUpdate} />
      <Route path="/user/" exact component={UserCreateUpdate} />

      <Route path="/homeowner/" exact component={UserView} />
      <Route path="/operator/" exact component={OperatorView} />

      <Route path="/transactions/" exact component={TransactionsList} />
      {/* <Route path="/transactions/:transaction_id" exact component={TransactionCreateUpdate} /> */}
      <Route path="/transaction/" exact component={TransactionCreateUpdate} />
      <Route path="/about-us" exact component={About} />
    </Switch>
  </Container>
)

export default BaseContent;
