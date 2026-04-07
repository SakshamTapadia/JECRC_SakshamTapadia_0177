import React from 'react';
import { useNotification } from '../context/NotificationContext';

export const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(notif => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};
