import React from 'react';
// We use the Route component to define the routes of our application; 
// the component the router should load once a match is found. 
// Each route needs a path to specify the path to be matched and a component to specify the component to load. 
// The exact property tells the router to match the exact path.
import { Router} from 'react-router-dom' // removed "Link" from list with "Route" because it was unused

import './App.css';

import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";
import BaseContent from "./components/BaseContent";
import Footer from "./components/Footer";
import { useAuth0 } from "./react-auth0-wrapper";
import history from "./utils/history";

// the root or top-level component of our React application:
function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
      // We have wrapped the BaseLayout component with the BrowserRouter component since our app is meant to run in the browser.
      <Router history={history}>

        <Header />
        <NavigationBar />
        <BaseContent />
        <Footer />

      </Router>
  );
}

export default App;