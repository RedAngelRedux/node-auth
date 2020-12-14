const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {

    let name = req.body.username;
    let pwd = req.body.password;
    let match = false;

    await User.findOne({ email: name})
        .then(user => {
            match = bcrypt.compareSync(pwd,user.password);
            if( match ) {
                req.user = user;
                return next();
            }
            else {
                res.status(401).send({message: "ACCESS DENIED"});
            }
        })

    // match ? res.send({ message: "Logged in!" }) : res.status(401).send({ message: "ACCESS DENIED."});
}

const issueToken = (req, res) => {
    const token = jwt.sign({_id: req.user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token",token).send(token);
}

module.exports = { login, issueToken };