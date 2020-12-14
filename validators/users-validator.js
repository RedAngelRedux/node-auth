const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// if the body is valid, pass it on to create user
// else, return error to API request
const validateUser = [
    body("name").isLength({min: 6, max: 32}).trim().not().isEmpty(),
    body("email").isEmail().normalizeEmail().trim().not().isEmpty(), //
    body("password").isLength({min: 6}).trim().not().isEmpty()
];

const validationCheck = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(500).send({errors: errors.array()});
    next();
}

const checkDuplicateEmails = async (req, res, next) => {

    let newUserEmail = req.body.email;

    // await User.find()
    // .exec((err, docs) => {
    //     if(err) res.status(500).send({message: `Something went wrong: ${err}!`});
    //     let userEmails = docs.map(user => user.email);

    //     if(userEmails.includes(newUserEmail)) {
    //         return res.status(409).send({message: `The email ${newUserEmail} already exists.`});
    //     }

    //     next();
    // })

    await User.find({email: newUserEmail})
        .exec((err, docs) => {
            if(err) return res.status(500).send({message: `Something went wrong: ${err}!`});
            if(docs.isLength > 0) return res.status(409).send({message: `The email ${newUserEmail} already exists`});
            next();
        })
}

module.exports = { validateUser, validationCheck, checkDuplicateEmails };