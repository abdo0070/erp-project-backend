const { model } = require("mongoose");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const UserModel = require("../model/UserModel.js");
const genrateToken = require("../JWT/genrateToken.js");
class UserController {
  static register = asyncWrapper(async (req, res, next) => {
    const newUser = await UserModel.create(req.body);
    const token = genrateToken(JSON.stringify(newUser));
    res.json({
      token,
    });
  });
  static all = asyncWrapper(async (req, res, next) => {
    const users = await UserModel.find({});
    res.json(users);
  });

  static login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (user == null || user == undefined) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = genrateToken(JSON.stringify(user));
    res.json({
      token,
    });
  });
  static search = asyncWrapper(async (req,res,next) => {
    const {q} = req.params;
    const users = await UserModel.find({ title: { $regex: new RegExp(q, "i") } });
    // Respond with the search results
    res.status(200).json({ success: true, data: users });
  });
  static singleUser = asyncWrapper(async () => {});
  static update = asyncWrapper(async (req,res,next) => {
    
  });
}

module.exports = UserController;
