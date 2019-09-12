import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import BaseContent from "./BaseContent";
import Footer from "./Footer";
import Auth from "../auth/Auth";
import history from "../../utils/history";

import './App.css';

// the root or top-level component of our React application:
class App extends Component {

  render() {
    return (
      <Auth>
        <Router history={history}>
          <Header />
          <div id="app" className="d-flex flex-column h-100">
            <NavigationBar />
            <BaseContent />
            <Footer />
          </div>
        </Router>
      </Auth>
    );
  }
}
export default App;