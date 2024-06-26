const asyncWrapper = require("../middlewares/asyncWrapper.js");
const UserModel = require("../model/UserModel.js");
const genrateToken = require("../JWT/genrateToken.js");
const fs = require("fs");
const CvModel = require("../model/CvModel.js");
class UserController {
  static register = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    const newUser = await UserModel.create(req.body);
    const token = genrateToken(JSON.stringify(newUser));
    res.json({
      token: token,
      data: newUser,
    });
  });

  static all = asyncWrapper(async (req, res, next) => {
    const users = await UserModel.find({});
    res.json({
      msg: "SUCCESS",
      data: users,
    });
  });

  static login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (user == null || user == undefined) {
      throw Error("WRONG EMAIL OR PASSWORD");
    }
    const token = genrateToken(JSON.stringify(user));
    res.json({
      token: token,
      user,
      role: 1,
    });
  });

  static search = asyncWrapper(async (req, res, next) => {
    const { q } = req.params;
    console.log(q);
    const users = await UserModel.find({
      title: { $regex: new RegExp(q, "i") },
    });
    // Respond with the search results
    res.status(200).json({ success: true, data: users });
  });
  static singleUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.json({
      data: user,
      msg: "SUCCESS",
    });
  });

  static update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    res.json({
      msg: "SUCCESS",
      data: user,
    });
  });

  static userCV = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const cv = await CvModel.findOne({ user_id: id });
    res.json({
      data: {
        cv,
      },
    });
  });
  static applicationApply = asyncWrapper(async (req, res, next) => {});
}

module.exports = UserController;
