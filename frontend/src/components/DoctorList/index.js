import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const API_BASE_URL = "http://localhost:5001/doctors";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const response = await axios.get(API_BASE_URL);
    setDoctors(response.data);
  };

  console.log(doctors);

  return (
    <div>
      <h2>Select a Doctor</h2>
      <div>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <Link to={`/doctors/${doctor._id}/schedule`}>
              <button>{doctor.name}</button>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
