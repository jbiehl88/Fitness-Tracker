// create the express server here
require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const { client } = require("./db");

client.connect();
