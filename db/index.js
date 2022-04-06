// require and re-export all files in this db directory (users, activities...)

const { rebuildDB } = require("./seedData");
const { createUser, getUser, getUserById } = require("./users");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
} = require("./activities");

const { createRoutine, getAllRoutines } = require("./routines");

module.exports = {
  rebuildDB,
  createUser,
  getUser,
  getUserById,
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  createRoutine,
  getAllRoutines,
};
