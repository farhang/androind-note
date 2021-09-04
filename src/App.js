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

    const [styles, setStyles] = useState({});
    // const [distance, setDistance] = useState(0);
    const onTouchMove = (event) => {
       // setDistance(event.distance);
    }

    const onTouchStatusChange = (event) => {
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
    };

    useEffect(() => {
        eventBus.on("DistanceCalculated", onTouchMove);
        eventBus.on("touchStatus", onTouchStatusChange);
    }, []);

  return (
      <Router>
          <div className={"header"} style={styles}>
          <Header />
          </div>
          <Switch>
            <Route exact path="/">
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
