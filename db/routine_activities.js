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

module.exports = {
  addActivityToRoutine,
};
