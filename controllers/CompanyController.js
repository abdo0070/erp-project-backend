const genrateToken = require("../JWT/genrateToken.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const CompanyModel = require("../model/CompanyModel.js");
const statusCodes = require("../utils/statusCodes");
class CompanyController {
  static login = asyncWrapper(async (req, res, next) => {
    const company = await CompanyModel.findOne({
      email: req.body?.email,
      password: req.body?.password,
    });
    if (company == undefined || company == null) {
      throw Error("WRONG EMAIL OR PASSWORD");
    }
    // GENRATE THE TOKEN
    const token = genrateToken(company);
    res.json({
      msg: "SUCCESS LOGIN",
      token: token,
      user: company,
    });
  });
  static register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, emp_size, address, image } = req.body;
    const newCompany = await CompanyModel.create({
      name,
      email,
      password,
      emp_size,
      address,
      image,
    });
    // Genrate the Token
    const token = genrateToken(newCompany);
    res.json({
      msg: statusCodes.SUCCESS,
      token: token,
    });
  });
  static all = asyncWrapper(async (req, res, next) => {
    const companies = await CompanyModel.find({});
    res.json({
      data: companies,
    });
  });


  static singleCompany = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const company = await CompanyModel.findById(id);
    res.json({
      data : company
    })
  });

  static update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const company = await CompanyController.findByIdAndUpdate(id, req.body);
    res.json({
      msg: "SUCCESS",
      data: company,
    });
  });
}

module.exports = CompanyController;
