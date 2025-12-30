const express = require("express");
const path = require("path");

const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/tasks", taskRoutes);

module.exports = app;