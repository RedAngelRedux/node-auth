import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, Redirect, useLocation } from "react-router-dom";

import logo from "../../images/logo.png";

const Login = ({ setToken }) => {
    
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("password1");
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const submitLogin = async (e) => {
        e.preventDefault();

        // let dbUrl = "http://localhost:5000/login";
        let dbUrl = "https://frozen-cove-12963.herokuapp.com/login";

        try {
            let status = await axios.post(
                dbUrl, 
                {
                    username: emailInput.toLowerCase(),
                    password: passwordInput,
                }
            );
            setToken(status.data);
            setLoginStatus(true);
            setLoginMessage("");
        } 
        catch {
            setLoginStatus(false);
            setLoginMessage("ACCESS DENIED");
        }
    };

    let location = useLocation();
    return (loginStatus) ? <Redirect to={{pathname: "/messages",state: { from: location }}}/> : 
    (
    <div className="auth-wrapper">
        <div className="auth-inner">
            <form>
                <center>
                <h3>Log In</h3>
                {loginMessage}
                <br />
                <img src={logo} alt="logo" width="50%" />
                </center>
                <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                </div>
                <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                    </label>
                </div>
                </div>
                <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={(e) => submitLogin(e)}
                >
                Submit
                </button>
            </form>
            <p className="forgot-password text-right">
                Forgot <a href="/forgot">password?</a>
            </p>
            <p className="forgot-password text-right">
                <Link to="/sign-up">Register Now</Link>
            </p>
        </div>
    </div>
    );
};

export default Login;
