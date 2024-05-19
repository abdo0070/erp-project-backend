const { application } = require("express");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ApplicationModel = require("../model/ApplicationModel");
const JobModel = require("../model/JobModel");

class ApplicationController {
  static store = asyncWrapper(async (req, res, next) => {
    const newApplication = {
      job_id: req.body.job_id,
      user_id: req.body.user_id,
    };
    const application = await ApplicationModel.create(newApplication);
    // INCREAMENT THE JOB APPLIED NUMBER
    await JobModel.findByIdAndUpdate(newApplication.job_id, {
      applied_num: 1,
    });
    res.json({
      msg: "SUCCESS",
      data: application,
    });
    //
  });
  static userApplications = asyncWrapper(async (req, res, next) => {
    // ALL THE USER APPLICATIONS
    const { userId } = req.params;
    const applications = await ApplicationModel.find({
      user_id: userId,
    })
      .populate({
        path: "user_id",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "job_id",
        model: "Job",
      });

    res.json({
      data: applications,
    });
  });

  static jobApplications = asyncWrapper(async (req, res, next) => {
    // ALL JOB APPLICATIONS
    const { jobId } = req.params;
    const applications = await ApplicationModel.find({
      job_id: jobId,
    })
      .populate({
        path: "user_id",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "job_id",
        model: "Job",
      });
    res.json({
      data: applications,
    });
  });

  static singleApplications = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const application = await ApplicationModel.findById(id)
      .populate({
        path: "user_id",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "job_id",
        model: "Job",
      });
    res.json({
      data: application,
    });
  });

  static updateViewedApplications = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const application = await ApplicationModel.findByIdAndUpdate(id, { status: "VIEWED" }, { new: true });
    await JobModel.findByIdAndUpdate(application.job_id, {
      veiwed_num: 1,
    });
    res.json({
      msg: "SUCCESS",
    });
  });
}

module.exports = ApplicationController;
