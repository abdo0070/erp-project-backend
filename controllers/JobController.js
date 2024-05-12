const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/asyncWrapper");
const JobModel = require("../model/JobModel");

class JobController {
  static store = asyncWrapper(async (req, res, next) => {
    const {
      company_id,
      title,
      career_level,
      expected_salary,
      job_type,
      skills,
      description,
      location,
    } = req.body;
    // GET THE COMPANY ID FROM THE TOKEN
    const newJob = await JobModel.create({
      company_id,
      title,
      career_level,
      expected_salary,
      job_type,
      description,
      skills,
      location,
    });
    res.json({
      data: newJob,
    });
  });
  static all = asyncWrapper(async (req, res, next) => {
    const jobs = await JobModel.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "company_id",
          foreignField: "_id",
          as: "company",
        },
      },
    ]);
    res.json({
      data: jobs,
    });
  });
  static singleJob = asyncWrapper(async (req, res, next) => {
    const { jobId } = req.params;
    const job = await await JobModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(`${jobId}`),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company_id", // Corrected to use 'company_id'
          foreignField: "_id",
          as: "company",
        },
      },
    ]);

    res.json({
      data: job[0],
    });
  });
  static companyJobs = asyncWrapper(async (req, res, next) => {
    const { company_id } = req.params;
    const jobs = await JobModel.aggregate([
      {
        $match: {
          company_id: new mongoose.Types.ObjectId(`${company_id}`),
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company_id", // Corrected to use 'company_id'
          foreignField: "_id",
          as: "company",
        },
      },
    ]);

    res.json({
      data: jobs,
    });
  });
  static delete = asyncWrapper(async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobModel.findByIdAndDelete(jobId);
    res.status(202).json({
      data: job,
    });
  });

  static update = asyncWrapper(async (req, res, next) => {
    const {id} = req.body;
    const job = await JobModel.findByIdAndUpdate(id, req.body);
    res.json({
      data: job,
    });
  });
}

module.exports = JobController;
