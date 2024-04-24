const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const JobSchema = new Schema({

});

module.exports = mongoose.model('Job',JobSchema);