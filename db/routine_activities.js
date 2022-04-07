const { client } = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
        INSERT INTO routine_activities ("routineId", "activityId", duration, count)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("routineId", "activityId") DO NOTHING
        RETURNING *;
        `,
      [routineId, activityId, duration, count]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine(routine) {
  try {
    const { rows } = await client.query(
      `SELECT * 
      FROM routine_activities
      JOIN routines ON routines.id = routine_activities."routineId"
      WHERE "routineId" = $1
      
      `,
      [routine.id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(routineActivityId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `SELECT * 
      FROM routine_activities
      WHERE id = $1
      `,
      [routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE routine_activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getRoutineActivityById(id);
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(routineActivityId) {
  console.log("see what its giving us", routineActivityId);
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    DELETE FROM routine_activities
    WHERE id = $1
    RETURNING *;
    `,
      [routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
};
