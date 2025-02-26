const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientName: { type: String, required: true },
  date: { type: Date, required: true }, // Stores full date & time
  duration: { type: Number, required: true }, // In minutes
  appointmentType: { type: String, required: true },
  notes: { type: String },
});

// 🔍 Ensure Unique Appointments Per Doctor Per Time Slot
appointmentSchema.index({ doctorId: 1, date: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
