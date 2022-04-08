const express = require("express");
const healthRouter = express.Router();

healthRouter.use("/", async (req, res, next) => {
  try {
    res.send("Server is healthy");
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = healthRouter;
