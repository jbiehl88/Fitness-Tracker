const { client } = require("./client");
const { attachActivitiesToRoutines } = require("./activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
                  INSERT INTO routines("creatorId", "isPublic", name, goal)
                  VALUES ($1, $2, $3, $4)
                  ON CONFLICT (name) DO NOTHING
                  RETURNING *;
                  `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id;
    `
    );
    // console.log("Phil needs a title", rows);
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(routineId) {
  // console.log("ById Params", routineId);
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE id=$1;
  `,
      [routineId]
    );

    if (!routine) {
      return null;
    }
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM routines;
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT routines.*, users.username as "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
      WHERE "isPublic" = true;
      `
    );
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(user) {
  try {
    const { rows: routines } = await client.query(
      `SELECT routines.*, users.username as "creatorName"
      FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE "username" = $1;
      `,
      [user.username]
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser(user) {
  try {
    const { rows: routines } = await client.query(
      `SELECT routines.*, users.username as "creatorName"
      FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE "username" = $1
      AND "isPublic" = true;
      `,
      [user.username]
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity(activity) {
  try {
    const { rows: routines } = await client.query(
      `SELECT routines.*, users.username as "creatorName"
      FROM routines
      JOIN users ON routines."creatorId"=users.id
      JOIN routine_activities ON routine_activities."routineId"= routines.id
      WHERE "activityId" = $1
      AND "isPublic" = true;
      `,
      [activity.id]
    );
    // console.log("RoutinesByActivity", routines);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getRoutineById(id);
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routineId) {
  try {
    await client.query(
      `
    DELETE FROM routine_activities
    WHERE "routineId" = $1;
    `,
      [routineId]
    );
    await client.query(
      `
    DELETE FROM routines
    WHERE id = $1;
    `,
      [routineId]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
};
