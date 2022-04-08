const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", async (req, res, next) => {
  try {
    res.send({ message: "Server is healthy" });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
//
module.exports = healthRouter;
