// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//Authentication config File
require("./config/auth.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Strive";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const myActivitiesRoutes = require("./routes/myActivities.routes");
app.use("/myactivities", myActivitiesRoutes);

const registerRoutes = require("./routes/auth/register.routes");
app.use("/", registerRoutes);

const createActivity = require("./routes/createActivity.routes");
app.use("/createActivity", createActivity);

const loginRoutes = require("./routes/auth/login.routes");
app.use("/", loginRoutes);

const profileView = require("./routes/profile.routes");
app.use("/", profileView);


const settings = require("./routes/settings.routes");
app.use("/", settings);


const logOut = require("./routes/auth/logout.routes");
app.use("/", logOut);

//Partials
hbs.registerPartials("./views/partials");
console.log(__dirname);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
