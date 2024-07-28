import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Healthchat from './Components/Healtchat';
import Team from './Components/Team';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard'
import { AuthProvider } from './Context/AuthContext';
import ApplyDoctor from './Components/ApplyDoctor';
import EditDoctor from './Components/EditDoctor';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/healthchat" element={<Healthchat />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/applydoctor" element={<ApplyDoctor />} />
          <Route path="/dashboard/editDoctorProfile" element={<EditDoctor/>} />
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
