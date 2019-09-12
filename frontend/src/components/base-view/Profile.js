import React from "react";
import { Redirect } from "react-router-dom"
// import Loading from "./Loading"
import { Row, Col } from 'react-bootstrap';
import { AuthConsumer } from "../auth/authContext";

const Profile = () => {
  // if (loading || !user) {
  //   return (
  //     <Loading />
  //   );
  // }

  return (
    <AuthConsumer>
      {({ user }) => (
        <div className="container">
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </Col>
            <Col md>
              <h2>{user.name}</h2>
              <p className="lead text-muted">{user.email}</p>
            </Col>
          </Row>
          <code>{JSON.stringify(user, null, 2)}</code>
        </div>
      )}
    </AuthConsumer>
  );
};

export default Profile;