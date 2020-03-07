/** @format */
require("dotenv").config();
const mongoose = require("mongoose");
const database = process.env.MONGO_URI;

const connectDataBase = async () => {
  try {
    await mongoose.connect(
      database,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      console.log("DATABASE CONNECTED")
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDataBase;
