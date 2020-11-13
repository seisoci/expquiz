// module.exports = app => {};
const users = require("../controllers/UsersController.js");
const verifyAuth = require("../middlewares/VerifyAuth");

var router = require("express").Router();

// router.post("/register", verifyAuth.verifyToken, users.createAdmin);
// router.put("/user/:id/admin", verifyAuth, users.updateUserToAdmin);

router.post("/", users.create);
router.get("/", users.index);
router.put("/:id", users.update);
router.delete("/:id", users.delete);
module.exports = router;
