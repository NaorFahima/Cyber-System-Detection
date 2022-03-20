import React from "react";
import {useEffect} from 'react';
import { Container } from "react-bootstrap";
import { AuthProvider } from "./firebase/AuthContext";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation, PrivateRoute } from "./components";

import {
  Profile,
  Login,
  ForgotPassword,
  UpdateProfile,
  UrlDetection,
  PhishingDetection,
  Home,
  Signup,
  Reports,
  PhishingDB,
  SchedulerWebsites,
} from "./views";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Container
        className="d-flex align-items-center "
        style={{ height: "100%", width: "100%" }}
      >
        <Router>
          <Switch>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute
              path="/phishing-detection"
              component={PhishingDetection}
            />
            <PrivateRoute path="/reports" component={Reports} />
            <PrivateRoute
              path="/scheduler-websites"
              component={SchedulerWebsites}
            />
            <PrivateRoute path="/profile" component={Profile} />
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/url-detection" component={UrlDetection} />
            <Route path="/phishing-db" component={PhishingDB} />
          </Switch>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
