const router = require("express").Router();

const { isAuthChecker } = require("../controllers/auth");

router.post("/isAuthChecker", isAuthChecker);

module.exports = router;
