// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Healthchat from './Components/Healtchat';
import Team from './Components/Team';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import { AuthProvider } from './Context/AuthContext';
import ApplyDoctor from './Components/ApplyDoctor';
import EditDoctor from './Components/EditDoctor';
import Notifications from './Components/Notifications';
import Doctors from './Components/Doctors';
import Medicines from './Components/MedicineReminders';
import DoctorsList from './Components/DoctorsList';
import Appointments from './Components/Appointments';
import Error from './Components/Error';
import VideoCall from './Components/VideoCall';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/vdo" element={<VideoCall/>} />
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/healthchat" element={<Healthchat />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="applydoctor" element={<ApplyDoctor />} />
          <Route path="editDoctorProfile" element={<EditDoctor />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:specialization" element={<DoctorsList />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="appointments" element={<Appointments/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
