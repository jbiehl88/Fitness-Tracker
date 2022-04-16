const express = require("express");
const routinesRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/routines");
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
    const routine = await updateRoutine({ id: routineId, fields });
    res.send(routine);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
