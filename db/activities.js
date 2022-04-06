const { client } = require("./client");

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
              INSERT INTO activities(name, description)
              VALUES ($1, $2)
              ON CONFLICT (name) DO NOTHING
              RETURNING *;
              `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `SELECT *
            FROM activities;
          `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(activityId) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        SELECT *
        FROM activities
        WHERE id=$1;
      `,
      [activityId]
    );

    if (!activity) {
      throw {
        name: "ActivityNotFoundError",
        message: "Could not find a activity with that activityId",
      };
    }

    //   const { rows: tags } = await client.query(
    //     `
    //     SELECT tags.*
    //     FROM tags
    //     JOIN post_tags ON tags.id=post_tags."tagId"
    //     WHERE post_tags."activityId"=$1;
    //   `,
    //     [activityId]
    //   );

    //   activity.tags = tags;

    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getActivityById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
