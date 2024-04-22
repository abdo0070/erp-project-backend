const { model } = require("mongoose");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const UserModel = require("../model/UserModel.js");
class UserController {
  static login = asyncWrapper(async (req, res, next) => {
    const newUser = await new UserModel.create({
      email : "abdalla@gmail.com",
      name : "abdalla",
      addrsss : "324 sudan st",
      carrer_level : "Junior",
      bio : "my name is abdalla I am Junior web developer love my carerr and looking forward to the opporunity :) ",
      city :"am",
      birth_date : "",
      cv_link : "",
      password : "123",
      skills : ["react.js" , "PHP", "HTML","CSS"],
      title : "Fullstack web developer"
    });
    res.json(newUser);
  });
  static register = asyncWrapper(async () => {});
  static search = asyncWrapper(async () => {});
  static singleUser = asyncWrapper(async () => {});
}

module.exports = UserController;
