const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    index: [true, "Email Aleardy Signed in"],
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
  address: {
    type: String,
    required: [true, "Address is Requierd"],
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
  cv_link : String,
  token : String
});


module.exports = mongoose.model('User',UserSchema);