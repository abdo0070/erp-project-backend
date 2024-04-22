const { default: mongoose } = require("mongoose");
const { type } = require("os");

const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Enter Your Email"],
    trim: true,
    index: true,
    unique: [true, "Email Aleardy Signed in"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  image: String,
  bio: String,
  city: {
    enum: {
      type : String,
      values: ["Cairo", "Aswan", "Alexandria", "Giza"],
      message: "{VALUE} is not supported",
    },
  },
  addrsss: {
    type: String,
    required: [true, "Adress is Requierd"],
  },
  skills: [],
  birth_date: { type: Date },
  carrer_level: {
    type: String,
    enum: {
      values: ["Senior", "Junior", "Student", "Mid-level"],
      message: "Carrer Level is not Found .",
    },
  },
  cv_link : String
});


module.exports = mongoose.model('User',UserSchema);