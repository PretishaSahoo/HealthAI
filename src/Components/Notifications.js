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
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-700 text-center">You have no new notifications.</p>
      ) : (
        <>
          <button
            className="bg-purple-500 text-white w-1/3 mx-auto px-4 py-2 rounded mb-4 flex justify-center"
            onClick={MarkAllRead}
          >
            Mark all as read
          </button>

          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Notification</th>
                <th className="border border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reversedNotifications.map((notification, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">{notification}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="bg-violet-500 text-white px-2 py-1 rounded"
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
