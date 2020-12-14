const router = require("express").Router();

const {login, issueToken} = require("../controllers/login-controllers");

router.post("/", login, issueToken);

module.exports = router;
