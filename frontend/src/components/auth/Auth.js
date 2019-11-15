import React, {Component} from "react";
import auth0 from "auth0-js";

import {AUTH_CONFIG} from "./auth0-variables";
import {AuthProvider} from "./authContext";

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: AUTH_CONFIG.audience,
  responseType: "token id_token"
});

class Auth extends Component {
  state = {
    authenticated: false,
    loading: true,
    user: {
      role: "visitor"
    },
    accessToken: "",
    loginRequired: false,
  };

  initiateLogin = () => {
    auth.authorize();
  };

  checkSession = () => {
    auth.checkSession({'scope':'openid profile email'}, (error, authResult) => {
      if (error) {
        // console.log(error);
        // console.log(`Error ${error.error} occured`);
        if (error.error === 'login_required') {
          this.setState({
            loginRequired: true
          })
        }
        return;
      }
      this.setSession(authResult);
      // console.log(authResult);
    });
  };

  logout = () => {
    auth.logout({
      returnTo: 'http://usmart-energy.com.s3-website-us-west-2.amazonaws.com'
    });
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      loading: true,
      accessToken: "",
      loginRequired: false
    });
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.error(error);
        console.log(`Error ${error.error} occured`);
        return;
      }
      
      this.setSession(authResult);
      // console.log(authResult); //Here for debugging with auth
    });
  };

  setSession(data) {
    const user = {
      id: data.idTokenPayload.sub,
      email: data.idTokenPayload.email,
      l_name: data.idTokenPayload.family_name,
      f_name: data.idTokenPayload.given_name,
      picture: data.idTokenPayload.picture,
      name: data.idTokenPayload.name,
      nickname: data.idTokenPayload.nickname,
      role: data.idTokenPayload[AUTH_CONFIG.roleUrl]
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      loading: false,
      user,
      loginRequired: false
    });
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
      checkSession: this.checkSession
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;