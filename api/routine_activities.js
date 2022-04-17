const express = require("express");
const { getRoutineById } = require("../db");
const routine_activitiesRouter = express.Router();
const {
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
} = require("../db/routine_activities");
const { requireUser } = require("./utils");

//needs work -- not returning (prob due to needing to log in) -- Jordan
routine_activitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    const { count, duration } = req.body;

    const updateFields = { id: routineActivityId };

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }

    try {
      const rAQuery = await getRoutineActivityById(routineActivityId);
      const routineQuery = await getRoutineById(rAQuery.routineId);
      if (routineQuery.creatorId === req.user.id) {
        const updatedRA = await updateRoutineActivity(updateFields);
        res.send(updatedRA);
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
);

// also needs work due to require user logged in to match the original poster -- Jordan
routine_activitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    try {
      const rAQuery = await getRoutineActivityById(routineActivityId);
      const routineQuery = await getRoutineById(rAQuery.routineId);
      if (routineQuery.creatorId === req.user.id) {
        // console.log("RA TO DELETE ", routineActivityId);
        const destroyed = await destroyRoutineActivity(routineActivityId);
        // console.log("RA DELETED ", destroyed);
        res.send(destroyed);
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routine_activitiesRouter;
