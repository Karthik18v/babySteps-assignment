import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css"; // Import the CSS file

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://babysteps-assignment-nh1l.onrender.com/doctors";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-list-container">
      <h2 className="doctor-list-title">Select a Doctor</h2>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialization">{doctor.specialization}</p>
              <p className="doctor-experience">
                {doctor.experience} years of experience
              </p>
              <div className="doctor-actions">
                <Link to={`/doctors/${doctor._id}/schedule`}>
                  <button className="view-schedule-button">
                    View Schedule
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorList;