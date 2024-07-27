import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Healthchat from './Components/Healtchat';
import Team from './Components/Team';
import Contact from './Components/Contact';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/healthchat" element={<Healthchat/>} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
