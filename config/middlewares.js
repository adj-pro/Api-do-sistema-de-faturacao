const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// const corsOptions ={
//   origin:'http://localhost:3000/',
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));
  app.use("/uploads", express.static("uploads"));
  app.use(cors());
  //  app.use(cors(corsOptions));
};