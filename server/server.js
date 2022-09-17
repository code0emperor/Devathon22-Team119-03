const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/users");
const connectDB = require("./config/db");
const passport = require("passport");

//Load config file

dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// middlewares

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

//Routes
app.use("/users", routes);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Running on port ${PORT} in ${process.env.NODE_ENV}`)
);
