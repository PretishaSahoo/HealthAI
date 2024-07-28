import React from 'react';
import { useAuth } from "../Context/AuthContext";
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { currentUser } = useAuth();

  return (
    <>
      <div
        className={`lg:w-[25%] lg:h-screen lg:fixed lg:top-[14%] lg:left-0 lg:z-10 lg:flex lg:flex-col lg:gap-4 lg:border-r lg:border-gray-200 bg-white text-purple-900
                    ${isSidebarOpen ? 'fixed top-[120px] left-0 w-full h-[calc(100vh)] lg:hidden' : 'hidden'}`}
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
            <h1 className="text-purple-900"> Your Appointments</h1>
          </div>
          {currentUser?.isDoctor === false  && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <h1 className="text-purple-900">Find Doctors</h1>
          </div>}
          {currentUser?.isDoctor === true && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/editDoctorProfile" className="text-purple-900">Edit Profile</Link>
          </div>}
          <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <h1 className="text-purple-900">Notifications</h1>
          </div>
          {currentUser?.isDoctor === false && currentUser?.isAdmin === false && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <h1 className="text-purple-900">Medicine Reminders</h1>
          </div>}
          {currentUser?.isDoctor === false  && <div className="p-4 bg-purple-50 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 mt-4 transition hover:bg-violet-500 focus:bg-violet-500">
            <Link to="/dashboard/applydoctor" className="text-purple-900">Apply as a Doctor</Link>
          </div>}
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed top-4 right-4 z-20 p-2 bg-purple-900 text-white rounded-full shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
