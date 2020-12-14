const router = require("express").Router();

const { verifyToken } = require("../controllers/auth-controller");
const { seedDB, getUserThreads, getUserThreadsInfo, getConvoMsgsFromTo,getConvoMsgsToFrom,sortConvoMsgsByDateTime} = require("../controllers/messages-controller");

router.get("/",verifyToken,getUserThreads,getUserThreadsInfo);

router.get("/u-threads",verifyToken,getUserThreads,getUserThreadsInfo);

router.post("/u-convo",verifyToken,getConvoMsgsFromTo,getConvoMsgsToFrom,sortConvoMsgsByDateTime);

router.post("/seedDB", seedDB);

module.exports = router;
