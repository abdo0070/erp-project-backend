const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title Name is Required"],
  },
  job_type: {
    type: String,
    required: [true, "job type is required"],
  },
  location: {
    type: String,
    required: [true, "location is Required"],
  },
  skills: Array,
  expected_salary: {
    type: Number,
    required: [true, "expected_salary is required"],
  },
  career_level: {
    type: String,
    required: [true, "career level is required"],
  },
  description: {
    type: String,
    required: [true, "job description is required"],
  },
  created_at: {
    type: Date,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Invaild company data ."],
  },
  post_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
