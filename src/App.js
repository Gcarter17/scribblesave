import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import ScribbleState from "./context/scribble/ScribbleState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import "./css/main.css";

const App = () => {
  return (
    <AuthState>
      <ScribbleState>
        <AlertState>
          <Router>
            <Fragment>
              <div className="page-wrapper">

                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ScribbleState>
    </AuthState>
  );
};

export default App;
