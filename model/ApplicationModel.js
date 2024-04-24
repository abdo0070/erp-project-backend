const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const ApplicationSchema = new Schema({
    
});

module.exports = mongoose.model('Application',ApplicationSchema);