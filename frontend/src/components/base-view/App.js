import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import BaseContent from "./BaseContent";
import Footer from "./Footer";
import history from "../../utils/history";

import './App.css';

// the root or top-level component of our React application:
class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Header />
        <NavigationBar />
        <div className="Application">
          <BaseContent />
        </div>
        <Footer />
      </Router>
    );
  }
}
export default App;