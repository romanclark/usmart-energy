import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import './App.css';
import Auth from "../auth/Auth";
import history from "../../utils/history";
import NavigationBar from "./NavigationBar";
import BaseContent from "./BaseContent";

// the root or top-level component of our React application:
class App extends Component {
  render() {
    return (
      <Auth>
        <Router history={history}>
          <NavigationBar />
          <div className="Application">
            <BaseContent />
          </div>
        </Router>
      </Auth>
    );
  }
}
export default App;
