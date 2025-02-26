import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import "./App.css"; // Import the CSS file for styling
import AppointmentSchedule from "./components/AppointmentSchedule";
import Appointments from "./components/Appointments";
import EditAppointment from "./components/EditAppointment";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="nav-container">
            <h1 className="nav-logo">Doctor App</h1>
            <div className="nav-links">
              <Link to="/appointments" className="nav-link">
                Appointments
              </Link>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route
            path="/doctors/:id/schedule"
            element={<AppointmentSchedule />}
          />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/edit/:id" element={<EditAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
