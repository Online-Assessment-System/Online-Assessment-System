require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";
const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";
const ATLAS_URL = "mongodb+srv://onlineassessmentsystemplatform:aGmJmxCLO3aXaAbw@cluster0.d13mzpe.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
  CLIENT_URL,
  SERVER_URL,
  PORT,
  env,
  ATLAS_URL,
};