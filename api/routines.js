const express = require("express");
const routinesRouter = express.Router();
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db");

module.exports = routinesRouter;
