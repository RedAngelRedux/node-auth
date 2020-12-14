import React, {useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

// import User from "./components/User";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import logo from "./images/logo.png";


import Login from "./components/Login";
import SignUp from "./components/Signup";
import Messages from "./components/Messages";

function App() {

  const [token, setToken] = useState("");

  // const [users, setUsers] = useState(false);

  // useEffect( () => {
  //   (async () => {
  //     const users = await axios("http://localhost:5000/api");
  //     setUsers(users.data);
  //   })();
  // },[])

  return (
    <BrowserRouter>

      <div className="App">

        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/userthreads"}>Messages</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <content className="main">
              <Switch>
                <Route path="/userthreads">
                  <Messages token={ token } />
                </Route>
                <Route exact path="/">
                {
                  (token === "") ? <Login setToken={ setToken } /> : <Messages token={ token } />
                }                  
                </Route>
                <Route path="/sign-in">
                {
                  (token === "") ? <Login setToken={ setToken } /> : <Messages token={ token } />
                }                  
                </Route>
                <Route path="/sign-up">
                  <SignUp/>
                </Route>
              </Switch>
        </content>

      </div>
    </BrowserRouter>
  );
}

export default App;
