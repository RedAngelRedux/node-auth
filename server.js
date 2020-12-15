const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/messages");

const path = require('path');

require("dotenv").config();
require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(express.static(path.join(__dirname,"client/build")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/users",usersRouter);
app.use("/login", loginRouter);
app.use("/messages",messageRouter);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`running on port ${port}`));