// require and re-export all files in this db directory (users, activities...)

const { rebuildDB } = require("./seedData");
const { createUser, getUser } = require("./users");

module.exports = {
  rebuildDB,
  createUser,
  getUser,
};
