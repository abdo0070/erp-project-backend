const CompanyController = require("../controllers/CompanyController");
const JobController = require("../controllers/JobController");
const UserController = require("../controllers/UserController");

const router = require("express").Router();

// USERS
router.route("/api/users").all(UserController.all);
router.post("/api/users/login",UserController.login);
router.post("/api/users/register",UserController.register);
router.get("/api/users/search",UserController.search);
router.get("/api/users/cv/:id",UserController.userCV);
// COMPANY
router.post("/api/companies/login",CompanyController.login);
router.post("/api/companies/register",CompanyController.register);

router.get("/api/companies",CompanyController.all);
router.get("/api/companies/jobs/:company_id",JobController.companyJobs);

// JOB
router.route("/api/jobs")
.get(JobController.all)
.post(JobController.store)
.patch(JobController.update)
.delete(JobController.delete)

router.get("/api/jobs/:jobId",JobController.singleJob);

// APPLICATION
router.get("*", (req, res) => {
  res.send("not found");
});

module.exports = router;
