const asyncWrapper = require("../middlewares/asyncWrapper");

class ApplicationController{
    static store = asyncWrapper(async (req,res,next) => {
        
    });
    static userApplications = asyncWrapper(async (req,res,next) => {

    });

    static jobApplications = asyncWrapper(async (req,res,next) => {

    });

    static singleApplications = asyncWrapper(async (req,res,next) => {

    });
}


module.exports = ApplicationController;