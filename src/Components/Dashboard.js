import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../Context/AuthContext';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [initialRedirect, setInitialRedirect] = useState(true); 

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentUser && initialRedirect) {
      if (currentUser.isDoctor) {
        navigate("/dashboard/appointments");
      } else {
        navigate("/dashboard/doctors");
      }
      setInitialRedirect(false); 
    }
  }, [currentUser, initialRedirect, navigate]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isLargeScreen={isLargeScreen}
      />

      {/* Main content */}
      <div
        className={`flex-1 mt-[60px] p-4 transition-all duration-300 ${
          isSidebarOpen || isLargeScreen ? 'lg:ml-[25%]' : 'ml-0'
        }`}
      >
        <Outlet />
      </div>

      {!isLargeScreen && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-20 p-2 bg-purple-900 text-white rounded-full shadow-md"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
