const mongoose = require("mongoose");

const connect = async () => {
  try{
    await mongoose.connect(process.env.DB_URI);
    console.log("DATABASE CONNECTED ...");
  }
  catch(err){
    console.log(err.message);
  }
};

connect();
