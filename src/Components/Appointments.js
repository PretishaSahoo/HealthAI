
import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";

const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-teal.vercel.app" : "http://localhost:3000";

export default function Appointments() {
  const { currentUser, acceptAppointment, rejectAppointment, fetchUser } = useAuth();
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const now = new Date();
      const parsedAppointments = (currentUser.appointments || []).map(appointment => {
        const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
        return { ...appointment, appointmentDate };
      });

      const accepted = parsedAppointments.filter(appointment => appointment.status === 'Accepted');
      const scheduled = parsedAppointments.filter(appointment => appointment.status === 'Scheduled' && appointment.appointmentDate > now);
      const rejected = parsedAppointments.filter(appointment => appointment.status === 'Rejected');
      const previous = parsedAppointments.filter(appointment => appointment.appointmentDate <= now);

      setAcceptedAppointments(accepted);
      setScheduledAppointments(scheduled);
      setRejectedAppointments(rejected);
      setPreviousAppointments(previous);
    }
  }, [currentUser]);

  const handleCancel = async (appointment) => {
    const data = {
      doctorUid: appointment.doctorUid,
      userUid: appointment.userUid,
      date: appointment.date,
      time: appointment.time,
    };
    await rejectAppointment(data);
    await fetchUser(currentUser.uid);
  };

  const handleAccept = async (appointment) => {
    const data = {
      doctorUid: appointment.doctorUid,
      userUid: appointment.userUid,
      date: appointment.date,
      time: appointment.time,
    };
    await acceptAppointment(data);
    await fetchUser(currentUser.uid);
  };

  const handleJoinCall = (appointment) => {
    console.log(appointment)
    const room = appointment.videoCallLink
    window.open(`${baseURL}/vdo/${room}`, '_blank');
  };

  const renderAppointments = (appointments, title, showButtons = true) => (
    <div className="mt-4">
      <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mb-6 mt-6">{title}</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-700">No {title.toLowerCase()}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appointments?.map((appointment) => (
            <div key={appointment.id} className="bg-gradient-to-t from-violet-100 to-pink-100 shadow-md rounded-lg p-4 mb-4 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-rose-400">
                    {currentUser.isDoctor ? appointment.userName : appointment.doctorName}
                  </h2>
                  <span className="text-sm text-gray-500">{appointment.specialization}</span>
                </div>
                <p className="text-sm text-gray-600">Date: {appointment.date}</p>
                <p className="text-sm text-gray-600">Time: {appointment.time}</p>
                <p className="text-sm text-gray-600">Status: {appointment.status}</p>
              </div>

              {showButtons && (
                <div className="flex gap-4 mt-2">
                  {appointment.status !== "Rejected" && (
                    <>
                      <button
                        onClick={() => handleCancel(appointment)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel Appointment
                      </button>
                      {currentUser.isDoctor && appointment.status !== "Accepted" && (
                        <button
                          onClick={() => handleAccept(appointment)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Accept Appointment
                        </button>
                      )}
                    </>
                  )}
                  {appointment.status === 'Accepted' && (
                    <button
                      onClick={() => handleJoinCall(appointment)}
                      className="text-violet-600 hover:text-violet-900"
                    >
                      Join Call
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 mt-24 animate-float">
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mb-4">My Appointments</h1>
      {renderAppointments(acceptedAppointments, 'Accepted Appointments')}
      {renderAppointments(scheduledAppointments, 'Scheduled Appointments waiting for Doctors Approval')}
      {renderAppointments(rejectedAppointments, 'Rejected Appointments')}
      {renderAppointments(previousAppointments, 'Previous Appointments', false)}
    </div>
  );
}
