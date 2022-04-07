// create the express server here
require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const { client } = require("./db/client");
const cors = require("cors");

client.connect();

server.use(cors());

server.use(express.json());

server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
