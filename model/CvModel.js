const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const CVSchema = new Schema({
    cv_name : String,
    contentType: String,
    uploadDate: Date,
    data: Buffer,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required : [true,'Invaild user data .'] }
});

module.exports = mongoose.model('Cv',CVSchema);