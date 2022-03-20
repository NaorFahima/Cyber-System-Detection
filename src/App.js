import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            <PrivateRoute path="/Cyber-System-Detection-Client/update-profile" component={UpdateProfile} />
            <PrivateRoute
              path="/Cyber-System-Detection-Client/phishing-detection"
              component={PhishingDetection}
            />
            <PrivateRoute path="/Cyber-System-Detection-Client/reports" component={Reports} />
            <PrivateRoute
              path="/Cyber-System-Detection-Client/scheduler-websites"
              component={SchedulerWebsites}
            />
            <PrivateRoute path="/Cyber-System-Detection-Client/profile" component={Profile} />
            <Route exact path="/Cyber-System-Detection-Client/" component={Home} />
            <Route path="/Cyber-System-Detection-Client/signup" component={Signup} />
            <Route path="/Cyber-System-Detection-Client/login" component={Login} />
            <Route path="/Cyber-System-Detection-Client/forgot-password" component={ForgotPassword} />
            <Route path="/Cyber-System-Detection-Client/url-detection" component={UrlDetection} />
            <Route path="/Cyber-System-Detection-Client/phishing-db" component={PhishingDB} />
          </Switch>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
