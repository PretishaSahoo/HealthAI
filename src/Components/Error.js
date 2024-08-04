import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Error() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-violet-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-500 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you’re looking for is not found. It might have restricted access.
        </p>
        <Link
          to="/"
          className="inline-block bg-violet-500 text-white py-2 px-4 rounded-lg transition hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
