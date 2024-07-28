import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";

// Sample data
const sampleAppointments = [
  {
    id: 1,
    doctor: 'Dr. Jane Smith',
    specialization: 'Cardiology',
    date: '2024-08-15',
    time: '10:00 AM',
    status: 'Scheduled',
    videoCallLink: 'https://example.com/video-call/1', 
  },
  {
    id: 2,
    doctor: 'Dr. John Doe',
    specialization: 'Neurology',
    date: '2024-08-20',
    time: '2:00 PM',
    status: 'Scheduled',
    videoCallLink: 'https://example.com/video-call/2', 
  },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setAppointments(sampleAppointments);
  }, []);

  const handleReschedule = (id) => {
    console.log(`Reschedule appointment with ID: ${id}`);
  };

  const handleCancel = (id) => {
    console.log(`Cancel appointment with ID: ${id}`);
  };

  const handleJoinCall = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="p-4 mt-24">
      <h1 className="text-2xl font-bold text-center text-violet-600 mb-4">My Appointments</h1>
      <div className="flex flex-col gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h2>
                <span className="text-sm text-gray-500">{appointment.specialization}</span>
              </div>
              <p className="text-sm text-gray-600">Date: {appointment.date}</p>
              <p className="text-sm text-gray-600">Time: {appointment.time}</p>
              <p className="text-sm text-gray-600">Status: {appointment.status}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleReschedule(appointment.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleJoinCall(appointment.videoCallLink)}
                  className="text-green-600 hover:text-green-900"
                >
                  Join Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
