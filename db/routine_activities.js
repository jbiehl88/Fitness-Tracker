const { client } = require("./client");

const { dbFields } = require("./util");

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

// async function updateRoutineActivity(id, fields) {
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");
//   try {
//     if (setString.length > 0) {
//       await client.query(
//         `
//         UPDATE routine_activities
//         SET ${setString}
//         WHERE id=${id}
//         RETURNING *;
//       `,
//         Object.values(fields)
//       );
//     }
//     return await getRoutineActivityById(id);
//   } catch (error) {
//     throw error;
//   }
// }

async function updateRoutineActivity(id, fields) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let routineActivity;
    if (dbFields(fields).insert.length > 0) {
      console.log(dbFields(toUpdate).insert);
      console.log("Testing123", Object.values(toUpdate));
      console.log(id);
      const { rows } = await client.query(
        `
        UPDATE routine_activities
        SET ${dbFields(toUpdate).insert}
        WHERE id = ${id}
        RETURNING *;
      `,
        Object.values(toUpdate)
      );
      console.log("Testing", rows);
      routineActivity = rows[0];
      return routineActivity;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(routineActivityId) {
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
