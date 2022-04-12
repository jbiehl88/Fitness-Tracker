const express = require("express");
const routine_activitiesRouter = express.Router();
const { updateRoutineActivity, destroyRoutineActivity } = require("../db");
const { requireUser } = require("./utils");

//needs work -- not returning (prob due to needing to log in) -- Jordan
routine_activitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    // console.log(routineActivityId)
    const { count, duration } = req.body;

    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }
    try {
      console.log("Jordan", updateFields);
      const updatedRA = await updateRoutineActivity(
        routineActivityId,
        updateFields
      );
      console.log("Pawan test", updatedRA);
      res.send(updatedRA);
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
    const { routineActivityId } = req.params.routineActivityId;
    try {
      const destroyed = await destroyRoutineActivity(routineActivityId);
      res.send(destroyed);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routine_activitiesRouter;
