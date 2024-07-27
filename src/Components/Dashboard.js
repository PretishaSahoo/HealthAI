import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    // Check if the screen size is large or small
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isLargeScreen={isLargeScreen} />

      {/* Main content */}
      <div
        className={`flex-1 mt-[60px] p-4 transition-all duration-300 ${
          isSidebarOpen || isLargeScreen ? 'lg:ml-[25%]' : 'ml-0'
        }`}
      >
        {/* Your main content goes here */}
      </div>

      {/* Toggle Button for Small Screens */}
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
