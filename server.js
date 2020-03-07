/** @format */
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

//Create server

const app = express();
app.use(express.json({ extended: true }));

//Connect to database

connectDB();

//Connect to routes and link them

app.use("/guests", require("./routes/guests"));
app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
//When app goes in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//set up the port and lsiten to it

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("SERVER RUNNING AT " + port));
