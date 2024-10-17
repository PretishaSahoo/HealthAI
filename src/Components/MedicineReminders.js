import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import "./Animations.css"

export default function MedicineReminders() {
  const { currentUser, addMedicineReminder, deleteMedicineReminder } = useAuth();
  const reminders = currentUser?.medicineReminders || [];

  const [medicine, setMedicine] = useState('');
  const [time, setTime] = useState('');

  const handleAddReminder =async(e) => {
    e.preventDefault();
    const formattedTime = formatTime(time);
    const data = { medicine, time: formattedTime, uid: currentUser.uid };
    await addMedicineReminder(data);
    setMedicine('');
    setTime('');
  };

  const handleDeleteReminder = async(reminder) => {
    const formattedTime = formatTime(reminder.time);
    const data = { medicine: reminder.medicine, time: formattedTime, uid: currentUser.uid };
    await deleteMedicineReminder(data);
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    return `${hour.padStart(2, '0')}:${minute.padEnd(2, '0')}`;
  };

  return (
    <div className="p-8 mt-24 animate-floatdown">
      <h2 className="text-3xl font-bold  leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mb-6">Medicine Reminders</h2>
      <form onSubmit={handleAddReminder} className="mb-8 bg-gradient-to-r from-violet-200 via-violet-100 to-violet-200 p-3 rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicine">
            Medicine Name
          </label>
          <input
            type="text"
            id="medicine"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Reminder Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="text-xl w-full text-center bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg  text-white px-4 py-2 rounded"
        >
          Add Reminder
        </button>
      </form>
      <h3 className="text-2xl font-bold text-purple-900 mb-4">Your Reminders</h3>
      {reminders.length === 0 ? (
        <p className="text-gray-700">You have no reminders.</p>
      ) : (
        <ul className="list-disc ">
          {reminders.map((reminder, index) => (
            <li key={index} className="mb-2 text-gray-700  bg-gradient-to-r from-violet-200 via-violet-100 to-violet-200  p-3  rouded flex justify-between items-center">
              <span>
                <span className="font-bold">{reminder.medicine}</span> at <span className="font-bold">{reminder.time}</span>
              </span>
              <button
                onClick={() => handleDeleteReminder(reminder)}
                className="bg-pink-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
