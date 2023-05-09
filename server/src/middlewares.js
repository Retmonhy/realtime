const express = require("express");
const cors = require("cors");
module.exports = (expressApp) => {
  expressApp.use(cors());
  expressApp.use(express.json());
};
