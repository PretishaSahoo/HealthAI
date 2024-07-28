import React from 'react';

const sampleNotifications = [
  { id: 1, message: 'Your appointment with Dr. Smith is confirmed.' },
  { id: 2, message: 'New message from Dr. Brown.' },
  { id: 3, message: 'Your prescription is ready for pickup.' }
];

export default function Notifications() {
  const notifications = sampleNotifications;

  return (
    <div className="p-4 mt-24">
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-700 text-center">You have no new notifications.</p>
      ) : (
        <>
         <button className="bg-purple-500 text-white w-1/3 mx-auto px-4 py-2 rounded mb-4 flex justify-center">
            Mark all as read
        </button>

          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="border border-gray-200 px-4 py-2">{notification.message}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button className="bg-violet-500 text-white px-2 py-1 rounded">
                      Mark as read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}