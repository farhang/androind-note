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
    const onTouchMove = (event) => {
       // console.log('event', event)
    }




    const [styles, setStyles] = useState({});

    useEffect(() => {
        eventBus.on("DistanceCalculated", onTouchMove);
        eventBus.on("touchStatus", (event) => {
            console.log('touchStatus', event)
            if (event.status === 'end') {
                eventBus.remove("DistanceCalculated", onTouchMove);
                setStyles({
                    visibility: 'visible',
                    opacity: 1,
                })
            } else  if (event.status === 'move') {
                setStyles({
                    visibility: 'hidden',
                    opacity: 0,
                })
            }

        });

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
