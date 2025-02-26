const express = require("express");
const router = express.Router();
const Doctor = require("../model/Doctor");
const Appointment = require("../model/Appointment");
const moment = require("moment");

//Get All Doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log(doctors);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST A Doctors
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get doctors availble slots at particular date

router.get("/:doctorId/slots", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query; // Expected format: YYYY-MM-DD
    console.log(date);

    if (!date) {
      return res.status(400).json({ message: "❌ Date is required" });
    }

    // Convert date to moment UTC
    const selectedDate = moment.utc(date, "YYYY-MM-DD");

    // 🔍 Find doctor and their working hours
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "❌ Doctor not found" });
    }

    const { start, end } = doctor.workingHours; // e.g., { start: "08:00", end: "17:00" }

    let currentSlot = moment.utc(date + " " + start, "YYYY-MM-DD HH:mm");
    const endSlot = moment.utc(date + " " + end, "YYYY-MM-DD HH:mm");
    const allSlots = [];

    // 🔍 Fetch booked appointments for the doctor on the given date
    const appointments = await Appointment.find({
      doctorId,
      date: {
        $gte: selectedDate.startOf("day").toDate(),
        $lt: selectedDate.endOf("day").toDate(),
      },
    });

    console.log(appointments);

    // Convert booked appointments to a list of occupied times
    const bookedSlots = appointments.map((appt) => ({
      start: moment.utc(appt.date).format("HH:mm"),
      end: moment.utc(appt.date).add(appt.duration, "minutes").format("HH:mm"),
    }));

    // 📌 Generate slots of 30 minutes and filter out booked ones
    while (currentSlot.isBefore(endSlot)) {
      let slotEnd = moment.utc(currentSlot).add(60, "minutes");
      const isBooked = bookedSlots.some(
        (booked) => moment.utc(currentSlot).format("HH:mm") === booked.start
      );

      if (!isBooked) {
        allSlots.push({
          startTime: currentSlot.format("HH:mm"),
          endTime: slotEnd.format("HH:mm"),
        });
      }

      currentSlot.add(60, "minutes");
    }

    return res.status(200).json({
      availableSlots: allSlots,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
