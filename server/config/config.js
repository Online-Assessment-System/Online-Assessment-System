require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";
const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

module.exports = {
  CLIENT_URL,
  SERVER_URL,
  PORT,
  env,
};