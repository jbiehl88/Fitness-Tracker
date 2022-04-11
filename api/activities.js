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

//needs requireUser (logged-in) to post but it is working (passing)- Jordan
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

// needs user token - not working yet - Jordan
// activitiesRouter.patch(
//   "/:activityId",
//   /*requireUser,*/ async (req, res, next) => {
//     const { activityId } = req.params;
//     const { name, description } = req.body;
//     const updateFields = {};

//     if (name) {
//       updateFields.name = name;
//     }
//     if (description) {
//       updateFields.description = description;
//     }
//     try {
//       const updatedActivity = updateActivity(activityId, updateFields);
//       res.send(updatedActivity);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

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
