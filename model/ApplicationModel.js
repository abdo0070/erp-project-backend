const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const ApplicationSchema = new Schema({
  status: {
    type: String,
    default: "PENDING",
  },
  created_at: Date,
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Invaild Job data ."],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Invaild company data ."],
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
