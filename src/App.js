import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LockScreen from "./lockScreen/LockScreen";
import React, {useEffect, useState} from "react";
import Home from "./home/Home";
import Header from "./common/header/Header";
import eventBus from "./common/Eventbus";

function App() {
    let visibility = 'visible';
    eventBus.on("touchStatus", (event) => {
        if(event.status === 'move' && visibility === 'visible') {
            console.log('start')
            visibility = 'hidden';
            setStyles({
                visibility: visibility,
                opacity: 0,
            })
        } else  if (event.status === 'end'){
            console.log('move')
            visibility = 'visible';
            setStyles({
                visibility: visibility,
                opacity: 1,
            })
        }
    } );

    const [styles, setStyles] = useState({});

    useEffect(() => {

    }, []);
  return (
      <Router>
          <div className={"header"} style={styles}>
          <Header />
          </div>
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
