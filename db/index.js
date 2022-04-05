// require and re-export all files in this db directory (users, activities...)

const { client } = require("./db/client");
const { rebuildDB } = require("./db/seedData");

module.exports = {
  client,
  rebuildDB,
};
