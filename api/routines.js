const express = require("express");
const routinesRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  getRoutineById,
} = require("../db/");
const { requireUser } = require("./utils");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { name, goal, isPublic } = req.body;
    const routine = await createRoutine({
      creatorId: req.user.id,
      isPublic,
      name,
      goal,
    });
    res.send(routine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { name, goal, isPublic } = req.body;
    const fields = { name, goal, isPublic };
    const routine = await updateRoutine({ id: routineId, ...fields });
    res.send(routine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routineDelete = await destroyRoutine(routineId);
    res.send(routineDelete);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post(
  "/:routineId/activities",
  requireUser,
  async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const { activityId, duration, count } = req.body;
      const routine = await addActivityToRoutine({
        routineId,
        activityId,
        duration,
        count,
      });
      if (!routine) {
        next();
      } else {
        res.send(routine);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routinesRouter;
