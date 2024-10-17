import React from 'react';
import { useAuth } from "../Context/AuthContext";
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { currentUser } = useAuth();

  return (
    <>
      <div
        className={`lg:w-[25%] lg:h-screen lg:fixed lg:top-[14%] lg:left-0 lg:z-10 lg:flex lg:flex-col lg:gap-4 lg:border-r lg:border-gray-200 bg-white text-purple-900 border border-gray-300
          ${isSidebarOpen ? 'fixed top-[14%] left-0 w-90 h-[calc(100vh)] lg:hidden z-20' : 'hidden lg:flex'}`}
      >
        <div className="bg-purple-900 text-white h-[22%] rounded flex flex-col justify-around gap-2 p-4">
          <Link to="/" className="flex items-center gap-3 cursor-pointer hover:bg-purple-700 p-2 rounded font-bold">
            Home
          </Link>
          <div className="items-center gap-3 cursor-pointer hover:bg-purple-700 p-2 rounded">
            <p className="font-bold">
              Welcome <span className="text-sm text-pink-600">{currentUser?.name}</span>
              <span>
                <p className="font-bold text-violet-200">
                  {currentUser?.isDoctor ? "Doctor" : "User"}
                </p>
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white text-purple-900 h-[calc(100%-20%)] rounded p-4">
          <Link
            to="/dashboard/appointments"
            className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 border-t border-gray-200 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
          >
            Your Appointments
          </Link>

          {currentUser?.isDoctor === false && (
            <Link
              to="/dashboard/doctors"
              className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
            >
              Find Doctors
            </Link>
          )}

          {currentUser?.isDoctor === true && (
            <Link
              to="/dashboard/editDoctorProfile"
              className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
            >
              Edit Profile
            </Link>
          )}

          <Link
            to="/dashboard/notifications"
            className="p-4 bg-purple-50 m-2 rounded font-semibold flex items-center justify-between gap-2 mt-4 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
          >
            <span>Notifications</span> 
            <span className="text-red-500">{currentUser?.notifications.length}</span>
          </Link>

          {currentUser?.isDoctor === false && (
            <Link
              to="/dashboard/medicines"
              className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
            >
              Medicine Reminders
            </Link>
          )}

          {currentUser?.isDoctor === false && (
            <Link
              to="/dashboard/applydoctor"
              className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500 text-purple-900"
            >
              Apply as a Doctor
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
