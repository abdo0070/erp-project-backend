const CompanyController = require("../controllers/CompanyController");
const UserController = require("../controllers/UserController");

const router = require("express").Router();

// USERS
router.route("/api/users").all(UserController.all);
router.post("/api/users/login",UserController.login);
router.post("/api/users/register",UserController.register);
router.get("/api/users/search",UserController.search);
// COMPANY
router.post("/api/companies/login",CompanyController.login);
router.post("/api/companies/register",CompanyController.register);

router.get("*", (req, res) => {
  res.send("not found");
});

module.exports = router;
