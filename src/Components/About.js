import React from 'react';
import './Animations.css'

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 ">
      <div className="max-w-7xl mx-auto  animate-floatdown">
        {/* Title Section */}
        <header className="text-center mb-12">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-purple-700 mt-24 sm:mt-24 md:mt-24">About Health AI</h1>
          <p className="text-lg text-gray-600">
            Discover the powerful features of Health AI, designed to enhance your healthcare experience.
          </p>
        </header>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Authentication</h2>
            <p className="text-gray-700">
              Secure sign-in and sign-up processes for users and doctors, ensuring safe and reliable access to your health data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Book Appointment</h2>
            <p className="text-gray-700">
              Easy appointment scheduling with options to reschedule or cancel bookings, tailored to your convenience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Video Chat</h2>
            <p className="text-gray-700">
              High-quality video consultations with healthcare professionals from the comfort of your home.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Chat Bot (Healthcare)</h2>
            <p className="text-gray-700">
              An intelligent chat bot for answering your healthcare queries and providing useful information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Medicine Reminder</h2>
            <p className="text-gray-700">
              Never miss a dose with automated reminders for your prescribed medications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Medical Image Sensing</h2>
            <p className="text-gray-700">
              Advanced analysis of medical images like X-rays to detect fractures and other conditions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">Symptom Disease Prediction</h2>
            <p className="text-gray-700">
              Predict potential diseases based on your symptoms with our sophisticated diagnostic tools.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
