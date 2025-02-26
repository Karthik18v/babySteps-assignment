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

      // Ensure correct date format for datetime-local input
      const formattedDate = data.date
        ? new Date(data.date).toISOString().slice(0, 16)
        : "";

      setAppointment({
        doctorId: data.doctorId,
        patientName: data.patientName,
        date: formattedDate,
        appointmentType: data.appointmentType,
        notes: data.notes || "",
      });
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
      await axios.put(`${API_BASE_URL}/${id}`, { ...appointment, duration: 60 });
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
    <div className="update-appointment-container">
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Doctor ID:</label>
        <input type="text" name="doctorId" value={appointment.doctorId} onChange={handleChange} required />

        <label>Patient Name:</label>
        <input type="text" name="patientName" value={appointment.patientName} onChange={handleChange} required />

        <label>Date:</label>
        <input type="datetime-local" name="date" value={appointment.date} onChange={handleChange} required />

        <label>Appointment Type:</label>
        <input type="text" name="appointmentType" value={appointment.appointmentType} onChange={handleChange} required />

        <label>Notes:</label>
        <textarea name="notes" value={appointment.notes} onChange={handleChange} />

        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
}

export default EditAppointment;
