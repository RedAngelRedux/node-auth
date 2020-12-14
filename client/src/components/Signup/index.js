import React, { useState } from 'react';

import axios from "axios";

import logo from "../../images/logo.png";


const SignUp = () => {

    const [message, setMessage] = useState("");

    const [emailInput, setEmailInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!matchPassword(passwordInput, confirmPasswordInput)) {
            setMessage("Password must match");
            return;
        }

        setMessage("");

        const newUser = {
            email: emailInput,
            name: nameInput,
            password: passwordInput,
        };

        try {
            await axios.post("http://localhost:5000/users/", { ...newUser });
        } catch {
            console.log("Nope");
        }

        setEmailInput("");
        setNameInput("");
        setPasswordInput("");
        setConfirmPasswordInput("");

    };

    const matchPassword = (pwd, confirm) => pwd === confirm;

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                <center>
                    <h3>Sign Up</h3>
                    <img src={logo} alt="logo" width="50%" />
                </center>
                <div className="form-group">
                    <label>Name</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    />
                </div>
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
                    <label>Confirm Password</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    />
                    <span className="warning-message">{message}</span>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => handleSubmit(e)}
                >
                    Sign Up
                </button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;