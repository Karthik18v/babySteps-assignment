import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css"; // Import CSS for better UI

const API_BASE_URL =
  "https://babysteps-assignment-nh1l.onrender.com/appointments";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setAppointments(appointments.filter((appt) => appt._id !== id));
      } catch (err) {
        alert("Error deleting appointment");
      }
    }
  };

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id} className="appointment-item">
            <p>
              <strong>Doctor:</strong> {appt.doctorId}
            </p>
            <p>
              <strong>Patient:</strong> {appt.patientName}
            </p>
            <p>
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
            </p>
            <p>
              <strong>Type:</strong> {appt.appointmentType}
            </p>
            <button className="edit-btn">
              <Link to={`/appointments/edit/${appt._id}`}>Edit</Link>
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteAppointment(appt._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
