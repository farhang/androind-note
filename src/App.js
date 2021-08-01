import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LockScreen from "./lockScreen/LockScreen";
import React from "react";
import Home from "./home/Home";
import Header from "./common/header/Header";

function App() {
  return (
      <Router>
          <Header>
          </Header>
          <Switch>
            <Route path="/">
              <LockScreen />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>

      </Router>
  );
}

export default App;
