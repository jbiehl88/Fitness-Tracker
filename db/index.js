// require and re-export all files in this db directory (users, activities...)

const { rebuildDB } = require("./seedData");
const {
  createUser,
  getUser,
  getUserByUserName,
  getUserById,
} = require("./users");
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
  getRoutineById,
  updateRoutine,
  destroyRoutine,
} = require("./routines");

const {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
} = require("./routine_activities");

module.exports = {
  rebuildDB,
  createUser,
  getUser,
  getUserByUserName,
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
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
};
