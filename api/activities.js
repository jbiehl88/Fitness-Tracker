const express = require("express");
const activitiesRouter = express.Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");
const { requireUser } = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  const activityData = {};
  try {
    activityData.name = name;
    activityData.description = description;
    const newActivity = await createActivity({ name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});

//   not working yet - Jordan
activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
  const { activityId } = req.params;
  // console.log("activityID", activityId);
  const { name, description } = req.body;
  // console.log("fields", name, description);
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  // console.log("Fields", updateFields);
  try {
    const updatedActivity = await updateActivity(activityId, updateFields);
    console.log("checking test", updateActivity);
    res.send(updatedActivity);
  } catch (error) {
    next(error);
  }
});

//needs work - returning empty object -- Jordan
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  try {
    const activityById = getPublicRoutinesByActivity(req.params.activityId);
    res.send(activityById);
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
