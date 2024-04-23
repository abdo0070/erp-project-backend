const UserController = require("../controllers/UserController");

const router = require("express").Router();

// USERS
router.route("/api/users").all(UserController.all);
router.route("/api/users/login").post(UserController.login);
router.route("/api/users/register").post(UserController.register);
router.get("/api/users/search",UserController.search);
// COMPANY
router.get("*", (req, res) => {
  res.send("not found");
});

module.exports = router;
