import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import axios from "axios";

import UserThreads from "./UserThreads";
import { config } from "../../Constants";

import logo from "../../images/logo.png";
import "./messages.css";

const Messages = ({token}) => {

    const [threads, setThreads] = useState([]);
    const [conversation, setConversation] = useState([]);


    // useEffect( () => {
    //     const fetchData = async () => {
    //         const response = await axios.get("http://localhost:5000/messages", { headers: {"auth-token": token }});
    //         setThreads(response.data);
    //     }
    //     fetchData();        
    // },[token]);

    useEffect( () => {
        let isSubscribed = true;
        const fetchData = async () => {
            await axios.get(config.url.API_URL + "/messages/", { headers: {"auth-token": token }})
                        .then(response => isSubscribed ? setThreads(response.data) : null)
                        .catch(error => {
                            if(isSubscribed) {
                                console.log(error);
                            }
                        })
        }
        fetchData();       
		return () => (isSubscribed = false); 
    },[token]);

    const getConvo = async (userId) => {
        console.log(userId);
        console.log(token);
        // await axios.post("http://localhost:5000/messages/u-convo",{ headers: {"auth-token": token}, data: { "partner": userId } })
        await axios({method: "POST", url: config.url.API_URL + "/messages/u-convo" , headers: {"auth-token": token}, data: { "partner": userId } })
                    .then(response => {
                        setConversation(response.data);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(`This is the error...${error}`);
                    })
    }

    let location = useLocation();
    return (token === "") ?  <Redirect to={{pathname: config.url.API_URL + "/sign-in",state: { from: location }}}/> :
    ( 
        <div className="message-board">

            <div className="sidenav">
                <img src={logo} alt="logo" width="25%" />
                <UserThreads threads={threads} getConvo={getConvo} />
            </div>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Messages</h3>
                    {
                        (conversation.length === 0) ? (<h3>loading...</h3>) : 
                        (
                            <div className="message-thread">
                                {
                                    conversation.map( v => {
                                        return <div className="single-message-block">@{v.date} "{v.body}"</div>
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Messages;