const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    index: [true, "Email Aleardy Signed in"],
    unique: [true, "Email Aleardy Signed in"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  address: {
    type: String,
    required: [true, "address is Required"],
  },
  token: String,
  image: String,
  emp_size: {
    type: Number,
    enum: {
      values: ["1-9", "10-100", "more than 100"],
    },
    description: String,
    last_login: String,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
