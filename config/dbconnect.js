const mongoose = require("mongoose");

console.log(process.env.DB_URL);

async function initdb() {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: "bloodbank" });
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("Error while connecting to DB");
    console.log(error);
  }
}

module.exports = initdb;
