const { client } = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [username, password]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username = $1
`,
      [username]
    );
    if (user.password !== password) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername({ username }) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username = $1
`,
      [username]
    );
    if (!rows || !rows.length) {
      return null;
    }
    console.log("User: ", rows[0]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT id, username 
        FROM users WHERE id=${userId};
      `
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = { createUser, getUser, getUserByUsername, getUserById };
