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

module.exports = { createRoutine, getAllRoutines };
