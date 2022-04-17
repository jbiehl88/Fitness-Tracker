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

    // console.log("ID tester", routineActivityId);
    const { count, duration } = req.body;

    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }

    try {
      // console.log("Jordan!!!!!", updateFields);
      const rAQuery = await getRoutineActivityById(routineActivityId);
      const routineQuery = await getRoutineById(rAQuery.routineId);
      console.log("rAQuery", rAQuery);
      console.log("routineQuery", routineQuery);
      console.log(req.user);
      if (routineQuery.creatorId !== req.user.id) {
        next();
      }
      const updatedRA = await updateRoutineActivity(
        routineActivityId,
        updateFields
      );
      // if (!updatedRA) {
      //   next();
      // } else {
      res.send(updatedRA);
      // }
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
    try {
      const rAQuery = await getRoutineActivityById(routineActivityId);
      const routineQuery = await getRoutineById(rAQuery.routineId);
      if (routineQuery.creatorId !== req.user.id) {
        next();
      }
      const { routineActivityId } = req.params;
      const destroyed = await destroyRoutineActivity(routineActivityId);
      res.send(destroyed);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routine_activitiesRouter;
