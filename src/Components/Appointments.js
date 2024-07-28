import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";


//code sample demo later will change accordinglllly 

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
      <h1 className="text-2xl font-bold  text-center text-violet-600 mb-4">My Appointments</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video Call</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleReschedule(appointment.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleJoinCall(appointment.videoCallLink)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Join Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
