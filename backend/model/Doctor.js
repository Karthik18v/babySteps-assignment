const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: { type: String, require: true },
  workingHours: {
    start: String,
    end: String,
  },
  specialization: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
