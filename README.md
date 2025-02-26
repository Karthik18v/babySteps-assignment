# Doctor Appointment Scheduling System

## Project Overview
The **Doctor Appointment Scheduling System** is a full-stack web application that allows patients to book, manage, and edit their appointments with doctors. The system features a list of available doctors, real-time slot availability, and appointment management functionalities.

## Features
- 📌 **Doctor Management:** View a list of doctors with their available slots.
- 📅 **Appointment Scheduling:** Patients can book appointments with doctors based on available time slots.
- 📝 **Edit Appointments:** Modify existing appointments, including date, time, and other details.
- 📖 **View Appointments:** List all scheduled appointments with details.
- 🔍 **Real-time Slot Availability:** Available slots are dynamically updated based on booked appointments.
- 🌐 **RESTful API Integration:** Backend APIs handle doctor details, appointment scheduling, and modifications.

## Tech Stack
### Frontend
- **React.js** – For building the interactive user interface.
- **React Router** – For handling navigation between different pages.
- **Axios** – For making API requests.
- **CSS** – For styling the application.

### Backend
- **Node.js & Express.js** – Backend framework to handle API requests.
- **MongoDB** – NoSQL database for storing doctor and appointment data.
- **Mongoose** – ODM for MongoDB.
- **Moment.js** – For date/time formatting and manipulation.
- **CORS & Express.json** – Middleware for handling requests and enabling CORS.

## Installation & Setup
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```bash
git clone https://github.com/Karthik18v/babySteps-assignment.git
cd doctor-appointment-system
```

### Backend Setup
1. Install dependencies:
```bash
cd backend
npm install
```
2. Start the backend server:
```bash
npm start
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```
2. Start the frontend application:
```bash
npm start
```

## API Endpoints
### Doctors
- `GET /doctors` – Fetch all doctors
- `POST /doctors` – Add a new doctor
- `GET /doctors/:doctorId/slots?date=YYYY-MM-DD` – Get available slots for a doctor

### Appointments
- `GET /appointments` – Fetch all appointments
- `POST /appointments` – Create an appointment
- `PUT /appointments/:id` – Update an appointment
- `DELETE /appointments/:id` – Delete an appointment

## Usage
1. Open the app in the browser at `http://localhost:3000`
2. Browse doctors and check their availability.
3. Schedule an appointment by selecting a doctor and an available slot.
4. View and edit existing appointments.

## Deployment
- **Frontend**: Deploy using [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
- **Backend**: Deploy using [Render](https://render.com/) or [Heroku](https://www.heroku.com/)
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/atlas)

## Future Enhancements
- 🏥 **Doctor Specializations & Ratings**
- 🔔 **Email & SMS Appointment Reminders**
- 📅 **Google Calendar Integration**
- 👨‍⚕️ **Doctor Profile Management**

## Contributors
- **Your Name** – *Karthik Chittiprolu*

## License
This project is licensed under the MIT License.

