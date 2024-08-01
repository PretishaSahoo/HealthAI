import React from 'react';
import { useAuth } from "../Context/AuthContext";
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { currentUser } = useAuth();

  return (
    <>
      <div
        className={`lg:w-[25%] lg:h-screen lg:fixed lg:top-[14%] lg:left-0 lg:z-10 lg:flex lg:flex-col lg:gap-4 lg:border-r lg:border-gray-200 bg-white text-purple-900
                   ${isSidebarOpen ? 'fixed top-[14%] left-0 w-full h-[calc(100vh)] lg:hidden z-20' : 'hidden lg:flex'}`}
      >
        <div className="bg-purple-900 text-white h-[22%] rounded flex flex-col justify-around gap-2 p-4">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-purple-700 p-2 rounded">
            <Link to="/" className="font-bold">Home</Link>
          </div>
          <div className="items-center gap-3 cursor-pointer hover:bg-purple-700 p-2 rounded">
            <p className="font-bold">Welcome <span className='text-sm text-pink-600'>{currentUser?.name}</span> <span> <p className="font-bold text-violet-200">
              {currentUser?.isDoctor ? "Doctor" :  "User"}
            </p></span></p>
          </div>
        </div>
        <div className="bg-white text-purple-900 h-[calc(100%-20%)] rounded p-4">
          <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 border-t border-gray-200 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to = "/dashboard/appointments" className="text-purple-900"> Your Appointments</Link>
          </div>
          {currentUser?.isDoctor === false  && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/doctors" className="text-purple-900">Find Doctors</Link>
          </div>}
          {currentUser?.isDoctor === true && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/editDoctorProfile" className="text-purple-900">Edit Profile</Link>
          </div>}
          <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to ="/dashboard/notifications" className="text-purple-900">Notifications <span className="text-red-500">{currentUser.notifications.length}</span></Link>
          </div>
          {currentUser?.isDoctor === false  && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/medicines" className="text-purple-900">Medicine Reminders</Link>
          </div>}
          {currentUser?.isDoctor === false  && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/applydoctor" className="text-purple-900">Apply as a Doctor</Link>
          </div>}
        </div>
      </div>
    </>
  );  
}
