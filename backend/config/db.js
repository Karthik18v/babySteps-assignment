const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://bittukarthik77:oDmoJJyH0YK8ksz2@cluster0.292vl.mongodb.net/"; // Ensure database name is included

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo Connection Error"));
db.once("open", () => {
  console.log("Connected to Mongo successfully!");
});

module.exports = db;
