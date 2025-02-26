const express = require("express");
const Appointment = require("../model/Appointment");
const router = express.Router();
const moment = require("moment");

//create appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } =
      req.body;

    //console.log(doctorId, date, duration, appointmentType, patientName, notes);

    // 🔍 Validate required fields
    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
      return res.status(400).json({ message: "Required All Fields" });
    }

    const appointmentStart = moment.utc(date);
    const appointmentEnd = moment.utc(date).add(duration, "minutes");

    // 🔍 Check for overlapping appointments
    const existingAppointment = await Appointment.findOne({
      doctorId,
      $or: [
        {
          date: {
            $lt: appointmentEnd.toDate(),
            $gte: appointmentStart.toDate(),
          },
        },
        {
          $expr: {
            $and: [
              {
                $lt: [
                  { $add: ["$date", { $multiply: ["$duration", 60000] }] },
                  appointmentEnd.toDate(),
                ],
              },
              { $gte: ["$date", appointmentStart.toDate()] },
            ],
          },
        },
      ],
    });

    console.log(existingAppointment);

    if (existingAppointment) {
      return res.status(409).json({ message: "Slot already booked!" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    return res
      .status(201)
      .json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

//get all  appointments

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get an appointmentById

router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully Deleted Appointment" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get specific appointmentById

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing appointment
router.put("/:id", async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } =
      req.body;

    // Validate input fields
    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
      return res.status(400).json({ message: "Required All Fields" });
    }

    const appointmentStart = moment.utc(date);
    const appointmentEnd = moment.utc(date).add(duration, "minutes");

    // Find the appointment to update
    const existingAppointment = await Appointment.findById(req.params.id);
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    console.log(existingAppointment);

    // Check for overlapping appointments (excluding the current one)
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      _id: { $ne: req.params.id }, // Exclude the current appointment from the check
      $or: [
        {
          date: {
            $lt: appointmentEnd.toDate(),
            $gte: appointmentStart.toDate(),
          },
        },
        {
          $expr: {
            $and: [
              {
                $lt: [
                  { $add: ["$date", { $multiply: ["$duration", 60000] }] },
                  appointmentEnd.toDate(),
                ],
              },
              { $gte: ["$date", appointmentStart.toDate()] },
            ],
          },
        },
      ],
    });

    if (overlappingAppointment) {
      return res.status(409).json({ message: "Slot already booked!" });
    }

    // Update appointment details
    existingAppointment.doctorId = doctorId;
    existingAppointment.date = date;
    existingAppointment.duration = duration;
    existingAppointment.appointmentType = appointmentType;
    existingAppointment.patientName = patientName;
    existingAppointment.notes = notes || existingAppointment.notes;

    await existingAppointment.save();

    return res
      .status(200)
      .json({ message: "Appointment updated successfully!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
