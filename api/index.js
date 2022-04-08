// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const apiRouter = express.Router();

// const activitiesRouter = require("./activities");
// apiRouter.use("/activities", activitiesRouter);

const healthRouter = require("./health");
apiRouter.use("/health", healthRouter);

// const routine_activitiesRouter = require("./routine_activities");
// apiRouter.use("/routine_activities", routine_activitiesRouter);

// const routinesRouter = require("./routines");
// apiRouter.use("/routines", routinesRouter);

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

apiRouter.use((err, req, res, next) => {
  res.send({
    name: err.name,
    message: err.message,
  });
});

module.exports = apiRouter;
