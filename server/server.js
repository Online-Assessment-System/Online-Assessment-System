const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { CLIENT_URL, PORT, env, ATLAS_URL } = require("./config/config");

const app = express();

// CORS
app.use(
  cors({
    origin: CLIENT_URL,     // Allow to server to accept request from different origin.
    methods: "*",           // Allow every method coming from client url
    credentials: true,      // Allow cookies from browser to pass through.
  })
);

// Parse json request body.
app.use(express.json());
// Parse urlencoded request body.
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------
const userRouter = require("./routes/user.route");
app.use("/api/user", userRouter);

// --------------- Connect to MongoDB ---------------
mongoose
  .connect(ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.error(err));

// --------------- Listen to given PORT ---------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
