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

const {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
} = require("./routines");

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
  getRoutinesWithoutActivities,
  getAllRoutines,
  addActivityToRoutine,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
};
