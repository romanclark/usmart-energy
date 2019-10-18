import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import BaseContent from "./BaseContent";
import Footer from "./Footer";
import Auth from "../auth/Auth";
import { AuthConsumer } from "../auth/authContext";
import history from "../../utils/history";

import './App.css';

// the root or top-level component of our React application:
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyChecked: false
    }
  }

  componentDidUpdate() {
    this.setState({ alreadyChecked: true })
  }

  render() {
    return (
      <Auth>
        <AuthConsumer>
          {({ checkSession }) => {
            if (!this.state.alreadyChecked) {
              checkSession();
            }
            return (
              <Router history={history}>
                <Header />
                <NavigationBar />
                <div className="Application">
                  <BaseContent />
                </div>
                <Footer />
              </Router>)
          }}
        </AuthConsumer>
      </Auth>
    );
  }
}
export default App;