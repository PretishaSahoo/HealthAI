import React from 'react';
import { useAuth } from '../Context/AuthContext';

export default function Notifications() {
  const { currentUser, MarkAsRead, MarkAllAsRead } = useAuth();
  const notifications = currentUser?.notifications || [];

  const reversedNotifications = [...notifications].reverse();

  const MarkRead = async (notification) => {
    const data = {
      uid: currentUser.uid,
      notification: notification
    };
    await MarkAsRead(data);
  };

  const MarkAllRead = async () => {
    const data = {
      uid: currentUser.uid,
    };
    await MarkAllAsRead(data);
  };

  return (
    <div className="p-4 mt-24 animate-float">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-700 text-center">You have no new notifications.</p>
      ) : (
        <>
          <button
            className="text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-full mb-4 mt-2"
            onClick={MarkAllRead}
          >
            Mark all as read
          </button>

          <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-xl">
            <thead>
              <tr>
                <th className="border text-violet-500 border-gray-200 px-4 py-2">Notification</th>
                <th className="border text-violet-500 border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reversedNotifications.map((notification, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">{notification}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg "
                      onClick={() => MarkRead(notification)}
                    >
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
