const statusCodes = require("../utils/statusCodes");

const errorHandler = (error, req, res, next) => {
  res
    .status(500)
    .send({ msg: error.message, status: statusCodes.SUCCESS.code });
    next();
};

module.exports = errorHandler;