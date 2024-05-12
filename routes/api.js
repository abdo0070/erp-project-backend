const ApplicationController = require("../controllers/ApplicationController");
const CompanyController = require("../controllers/CompanyController");
const JobController = require("../controllers/JobController");
const UserController = require("../controllers/UserController");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

// AUTH
router.post("/api/users/login", UserController.login);
router.post("/api/users/register", UserController.register);

router.post("/api/companies/login", CompanyController.login);
router.post("/api/companies/register", CompanyController.register);

// USERS
router.route("/api/users").get(verifyJWT, UserController.all);
router.get("/api/users/search", UserController.search);
router.get("/api/users/cv/:id", verifyJWT, UserController.userCV);
router.get("/api/users/:id", verifyJWT, UserController.singleUser);

// COMPANY
router.get("/api/companies", [verifyJWT, CompanyController.all]);
router.get("/api/companies/jobs/:company_id", [
  verifyJWT,
  JobController.companyJobs,
]);

// JOB
router
  .route("/api/jobs")
  .get(verifyJWT, JobController.all)
  .post(verifyJWT, JobController.store)
  .patch(verifyJWT, JobController.update);
router.get("/api/jobs/:jobId", verifyJWT, JobController.singleJob);
router.delete("/api/jobs/:jobId", verifyJWT, JobController.delete);

// APPLICATION
router.post("/api/applications",ApplicationController.store);
router.get("/api/applications/job/:jobId",ApplicationController.jobApplications);
router.get("/api/applications/user/:userId",ApplicationController.userApplications);
router.get("/api/applications/:id",ApplicationController.singleApplications);


router.get("*", (req, res) => {
  res.send("not found");
});

module.exports = router;
