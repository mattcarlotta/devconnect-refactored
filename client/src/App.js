import React, { useEffect } from "react";
// Selectively imports BrowserRouter, Route and Link from react-router-dom. The as Router statement makes BrowserRouter available under the name Router (instead of BrowserRouter), while the names of Route and Link are not changed
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

store.dispatch(loadUser());

const App = () => (
  // Provider connects React with Redux
  <Provider store={store}>
    <Router>
      <Navbar />
      <Alert />
      <Switch>
        {/* exact prop needed to prevent all routes starting with "/" to render */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <CreateProfile exact path="/create-profile" component={CreateProfile} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
