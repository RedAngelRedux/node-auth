const router = require("express").Router();

const {seedDB, getUsers, createUser} = require("../controllers/users-controller");
const { validateUser, validationCheck, checkDuplicateEmails } = require("../validators/users-validator");
// ----- GET ----- //
router.get("/", getUsers);
// '/:id' getUser

// ----- POST ----- //
router.post("/", validateUser, validationCheck, checkDuplicateEmails, createUser);


// ----- SEED ----- //
router.post("/seedDB", seedDB);

module.exports = router;