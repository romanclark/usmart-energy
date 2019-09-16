import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../auth/authContext";
import Can from "../auth/Can"

const HomePage = () => (
  <AuthConsumer>
    {({ user }) => (
      <div>
        {/* {console.log(user.role)} */}
        <Can
          role={user.role}
          perform="user-pages:visit"
          yes={() => (
            <Redirect to="/homeowner/" />
          )}
        />
        <Can
          role={user.role}
          perform="admin-pages:visit"
          yes={() => (
            <Redirect to="/operator/" />
          )}
          no={() => (
            <Redirect to="/about-us" />
          )}
        />
      </div>
    )}
  </AuthConsumer>
);

export default HomePage;