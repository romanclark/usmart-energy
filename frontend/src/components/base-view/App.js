import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import BaseContent from "./BaseContent";
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

  componentDidMount() {
    this.setState({ alreadyChecked: true })
  }

  render() {
    return (
      <Auth>
        <AuthConsumer>
          {({ checkSession, user }) => {
            if (!this.state.alreadyChecked && !user.id === true) {
              checkSession();
            }
            return (
              <Router history={history}>
                <NavigationBar />
                <div className="Application">
                  <BaseContent />
                </div>
              </Router>
            )
          }}
        </AuthConsumer>
      </Auth>
    );
  }
}
export default App;