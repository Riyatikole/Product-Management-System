const router = require("express").Router();
const { auth } = require("../controllers/authController")


router.post("/", auth );
module.exports = router;

