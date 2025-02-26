import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import DoctorList from "./components/DoctorList";

function App() {
  return (
    <Router>
      <div>
        <nav className="nav-bar">
          <h1>Doctor</h1>
          <Link to="/">
            <button>Home</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<DoctorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
