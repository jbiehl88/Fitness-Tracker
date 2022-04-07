const express = require("express");
const healthRouter = express.Router();

healthRouter.use((req, res, next) => {
  console.log("Server is healthy");
  res.send("Server is healthy");
});

module.exports = healthRouter;
