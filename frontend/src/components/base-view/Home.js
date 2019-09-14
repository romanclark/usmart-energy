import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../auth/authContext";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/profile" />
      ) : (
        <div>
          <h2>Welcome to Electric Avenue.</h2>
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;