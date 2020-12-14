import React from "react";

const User = ({user}) => {
    const {name, username, email, phone, password, website, date} = user;
    console.log(user);
    return (
        <div>
            <h3>{name}: {email} </h3>
    {/* <h4>Created on:  { date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}) }</h4> */}
    <h4>{date.toLocaleString()}</h4>
        </div>
    );

}

export default User;