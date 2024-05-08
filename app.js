const express = require("express");
require("dotenv").config();
const cors = require('cors')
require('./JWT/genrateToken.js')
const app = express();
require("./db/connect");
const router = require('./routes/api.js');

function start() {
  app.listen(process.env.PORT || 9000, () => {
    console.log("server is listing ...");
  });
  app.use([cors(),express.urlencoded({extended : true}),router]);
}

start();