import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const API_BASE_URL = "https://babysteps-assignment-nh1l.onrender.com/appointments";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    doctorId: "",
    patientName: "",
    date: "",
    duration: 30,
    appointmentType: "",
    notes: "",
  });

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      const data = response.data;

      // Ensure date format is suitable for input[type="datetime-local"]
      const formattedDate = data.date
        ? new Date(data.date).toISOString().slice(0, 16) // Converts to "YYYY-MM-DDTHH:MM"
        : "";

      setAppointment({ ...data, date: formattedDate });
    } catch (err) {
      alert("Failed to load appointment details");
    }
  };

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/${id}`, appointment);
      alert("Appointment updated successfully");
      navigate("/appointments");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Selected slot is already booked! Please choose another time.");
      } else {
        alert("Error updating appointment");
      }
    }
  };

  return (
    <div className="edit-appointment-container">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Doctor ID:</label>
        <input
          type="text"
          name="doctorId"
          value={appointment.doctorId}
          onChange={handleChange}
          required
        />

        <label>Patient Name:</label>
        <input
          type="text"
          name="patientName"
          value={appointment.patientName}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="datetime-local"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
        />

        <label>Duration (minutes):</label>
        <input
          type="number"
          name="duration"
          value={appointment.duration}
          onChange={handleChange}
          required
        />

        <label>Appointment Type:</label>
        <input
          type="text"
          name="appointmentType"
          value={appointment.appointmentType}
          onChange={handleChange}
          required
        />

        <label>Notes:</label>
        <textarea
          name="notes"
          value={appointment.notes}
          onChange={handleChange}
        />

        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
}

export default EditAppointment;
