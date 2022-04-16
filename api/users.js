const express = require("express");
const {
  getUserByUserName,
  createUser,
  getPublicRoutinesByUser,
} = require("../db");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUserName({ username });
    if (_user) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
      return;
    }
    if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordToShort",
        message: "Your password must be at least 8 character long",
      });
      return;
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({ user, token });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
    return;
  }

  try {
    const user = await getUserByUserName({ username });

    if (user && user.password == password) {
      const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const routines = await getPublicRoutinesByUser(
      req.params.username,
      req.body
    );

    res.send({ routines });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
