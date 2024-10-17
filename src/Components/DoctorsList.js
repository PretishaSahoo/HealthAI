import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function DoctorsList() {
  const { doctors, bookAppointment, currentUser ,fetchUser} = useAuth();
  const { specialization } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialization.some((spec) => spec.toLowerCase() === specialization.toLowerCase())
  );

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleBookAppointment = async () => {
    const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const now = new Date();

    if (selectedDateTime < now) {
      alert('Please select a future date and time for the appointment.');
      return;
    }
    const data = {
      doctorUid: selectedDoctor.uid,
      userUid: currentUser.uid,
      date: appointmentDate,
      time: appointmentTime,
      doctorName :selectedDoctor.name,
      userName: currentUser.name
    };
    await bookAppointment(data);
    await fetchUser(currentUser.uid);
    setAppointmentDate('');
    setAppointmentTime('');
    setSelectedDoctor(null);
    setShowModal(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="p-4 mt-20 animate-float">
      <div className="p-4 animate-float">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent  mb-6">
        Doctors - {specialization.charAt(0).toUpperCase() + specialization.slice(1)}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={doctor.profilePic}
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent  mb-2">{doctor.name}</h2>
              <p className="text-gray-600 text-base">
                <strong>Specialization:</strong> {specialization}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Experience:</strong> {doctor.experience}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Clinic Address:</strong> {doctor.clinicAddress}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Fees:</strong> {doctor.fees}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Working Hours:</strong> {doctor.workingHours.start} - {doctor.workingHours.end}
              </p>
              <button
                className="text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg "
                onClick={() => handleBookClick(doctor)}
              >
                Book Appointment
              </button>
        </div>
      ))
    ) : (
      <p className="text-gray-700">No doctors found for this specialization.</p>
    )}
  </div>


      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg  w-[80%] sm:w-1/3">
            <h2 className="text-xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mb-4">Book Appointment</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={getTodayDate()}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Time</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-700  text-white text-sm md:text-base font-semibold  text-center rounded-lg  p-3 m-2 "
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg "
                onClick={handleBookAppointment}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
