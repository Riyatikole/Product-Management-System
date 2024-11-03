const router = require("express").Router();
const { users } = require("../controllers/usersController")

router.post("/", users);
module.exports = router;