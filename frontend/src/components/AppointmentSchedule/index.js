import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default calendar styling
import "./index.css"; // Custom styling for the component

function AppointmentSchedule() {
  const { id } = useParams(); // Get the doctor ID from the URL
  const [date, setDate] = useState(new Date()); // Selected date
  const [availableSlots, setAvailableSlots] = useState([]); // Available slots for the selected date
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const [selectedSlot, setSelectedSlot] = useState(null); // Selected slot
  const [patientName, setPatientName] = useState(""); // Patient name input
  const [notes, setNotes] = useState(""); // Notes input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isBooking, setIsBooking] = useState(false); // Booking loading state

  // Fetch available slots when the date changes
  useEffect(() => {
    if (date) {
      fetchAvailableSlots();
    }
  }, [date]);

  // Fetch available slots for the selected date
  const fetchAvailableSlots = async () => {
    setLoading(true);
    setError("");
    try {
      const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const response = await axios.get(
        `https://babysteps-assignment-nh1l.onrender.com/doctors/${id}/slots?date=${formattedDate}`
      );
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      setError("Failed to fetch available slots. Please try again.");
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle slot selection
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true); // Open the modal
  };

  // Handle appointment booking
  const handleBookAppointment = async () => {
    if (!patientName) {
      setError("Patient name is required.");
      return;
    }

    setIsBooking(true); // Start booking process
    setError("");

    try {
      const appointmentData = {
        doctorId: id,
        date: `${date.toISOString().split("T")[0]}T${
          selectedSlot.startTime
        }:00Z`,
        duration: 60, // Assuming each slot is 60 minutes
        appointmentType: "General Checkup",
        patientName,
        notes,
      };

      const response = await axios.post(
        "https://babysteps-assignment-nh1l.onrender.com/appointments",
        appointmentData
      );

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        setSelectedSlot(null);
        setPatientName("");
        setNotes("");
        setIsModalOpen(false); // Close the modal
        fetchAvailableSlots(); // Refresh available slots
      }
    } catch (error) {
      setError("Failed to book appointment. Please try again.");
      console.error("Error booking appointment:", error);
    } finally {
      setIsBooking(false); // End booking process
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setError("");
  };

  return (
    <div className="appointment-schedule">
      <h2>Book an Appointment</h2>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} minDate={new Date()} />
      </div>

      {loading && <p className="loading">Loading available slots...</p>}
      {error && <p className="error">{error}</p>}

      <div className="slots-container">
        <h3>Available Slots for {date.toDateString()}</h3>
        {availableSlots.length > 0 ? (
          <div className="slots-grid">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-button ${
                  selectedSlot === slot ? "selected" : ""
                }`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
          </div>
        ) : (
          <p>No available slots for this date.</p>
        )}
      </div>

      {/* Modal for booking appointment */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Book Your Appointment</h3>

            {/* Patient Name Field */}
            <div className="form-group">
              <label>Patient Name:</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              {!patientName && (
                <p className="error-message">Patient name is required.</p>
              )}
            </div>

            {/* Notes Field */}
            <div className="form-group">
              <label>Notes (Optional):</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes"
              />
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Modal Actions */}
            <div className="modal-actions">
              <button
                onClick={handleBookAppointment}
                className="book-button"
                disabled={!patientName || isBooking} // Disable button if patientName is empty or booking is in progress
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </button>
              <button onClick={closeModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentSchedule;
