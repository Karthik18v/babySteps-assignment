const express = require("express");
const cors = require("cors");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(5001, () => console.log("Server Running At http://localhost:5001"));
