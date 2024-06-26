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
router.get("/api/users/search/:q", verifyJWT ,UserController.search);
router.get("/api/users/cv/:id", verifyJWT, UserController.userCV);
router.get("/api/users/:id", verifyJWT, UserController.singleUser);
router.patch("/api/users/:id", verifyJWT, UserController.update);

// COMPANY
router.get("/api/companies", [verifyJWT, CompanyController.all]);
router.get("/api/companies/:id", [verifyJWT, CompanyController.singleCompany]);
router.get("/api/companies/jobs/:company_id", [
  verifyJWT,
  JobController.companyJobs,
]);
router.patch("/api/companies/:id", verifyJWT, CompanyController.update);


// JOB
router
  .route("/api/jobs")
  .get(verifyJWT, JobController.all)
  .post(verifyJWT, JobController.store);
router.get("/api/jobs/:jobId", verifyJWT, JobController.singleJob);
router.patch("/api/jobs/:jobId", verifyJWT, JobController.update);
router.delete("/api/jobs/:jobId", verifyJWT, JobController.delete);
router.get("/api/jobs/applications/:jobId", verifyJWT, JobController.getAllApplicationsForJob);

// APPLICATION
router.post("/api/applications",verifyJWT ,ApplicationController.store);
router.get(
  "/api/applications/job/:jobId",
  ApplicationController.jobApplications
);
router.get(
  "/api/applications/user/:userId",
  ApplicationController.userApplications
);
router.get("/api/applications/:id", ApplicationController.singleApplications);
router.patch("/api/applications/:id", ApplicationController.updateViewedApplications);

router.get("*", (req, res) => {
  res.send("not found");
});

module.exports = router;
