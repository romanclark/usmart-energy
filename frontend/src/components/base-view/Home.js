import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../auth/authContext";
import Can from "../auth/Can"

const HomePage = () => (
  <AuthConsumer>
    {({ user }) => (
      <div>
        <Can
          role={user.role}
          perform="homeowner-pages:visit"
          yes={() => (
            <Redirect to="/homeowner/" />
          )}
        />
        <Can
          role={user.role}
          perform="operator-pages:visit"
          yes={() => (
            <Redirect to="/operator/" />
          )}
        />
        <Can
          role={user.role}
          perform="about-page:visit"
          yes={() => (
            <Redirect to="/about-us" />
          )}
        />
      </div>
    )}
  </AuthConsumer>
);

export default HomePage;