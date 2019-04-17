import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom' // BrowserRouter keeps the UI in sync with the URL using the HTML5 history API.
// We use the Route component to define the routes of our application; 
// the component the router should load once a match is found. 
// Each route needs a path to specify the path to be matched and a component to specify the component to load. 
// The exact property tells the router to match the exact path.
import { Route } from 'react-router-dom' // removed "Link" from list with "Route" because it was unused
import UsersList from './UsersList'
import UserCreateUpdate from './UserCreateUpdate'

import AssetsList from './AssetsList'
import AssetsListByUser from './AssetsListByUser'
import AssetCreateUpdate from './AssetCreateUpdate'

import Distributor from './Distributor'
import About from './About'

import TransactionsList from './TransactionsList'
import TransactionCreateUpdate from './TransactionCreateUpdate'

import './App.css';
import logo from './Smart-Energy.png';

const Tester = () => (

<div className="App-header">
<img className = "navbar-brand" src={logo} height={60} alt="USmart Energy Logo"/>
</div>
)

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/personal/1">Personal</a>
      
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="navbar-brand" href="/distributor/">System Distributor</a>
          </li>
          <li className="nav-item active" >
            <a className="navbar-brand" href="/transactions/">Financial</a>
          </li>
        </ul>

        <a className="navbar-brand" href="/about-us"> 
          About us
        </a>
      </div>
    </nav>
    <div className="content">
      <Route path="/"/>
      <Route path="/personal/:user_id" exact component={AssetsListByUser}/>      
      <Route path="/assets/" exact component={AssetsList} />
      <Route path = "/assets/:asset_id" exact component={AssetCreateUpdate} />
      <Route path = "/asset/:user_id" exact component={AssetCreateUpdate} />
      
      <Route path="/distributor/" exact component={Distributor}/>
      <Route path="/users/" exact component={UsersList} />
      <Route path="/users/:user_id" exact component={UserCreateUpdate} />
      <Route path="/user/" exact component={UserCreateUpdate} />

      <Route path="/transactions/" exact component={TransactionsList} />
      <Route path="/transactions/:transaction_id" exact component={TransactionCreateUpdate} />
      <Route path="/transaction/" exact component={TransactionCreateUpdate} />
      <Route path="/about-us" exact component= {About}/>
</div>
  </div> 
  )

// the root or top-level component of our React application:
class App extends Component {

  render() {
    return (
      // We have wrapped the BaseLayout component with the BrowserRouter component since our app is meant to run in the browser.
      <BrowserRouter>
        <Tester/>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}
export default App;

/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
*/