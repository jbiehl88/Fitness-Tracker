// require and re-export all files in this db directory (users, activities...)

const { rebuildDB } = require("./seedData");
const { createUser, getUser, getUserById } = require("./users");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  attachActivitiesToRoutines,
} = require("./activities");

const { createRoutine, getAllRoutines } = require("./routines");

const { addActivityToRoutine } = require("./routine_activities");

module.exports = {
  rebuildDB,
  createUser,
  getUser,
  getUserById,
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  attachActivitiesToRoutines,
  createRoutine,
  getAllRoutines,
  addActivityToRoutine,
};
