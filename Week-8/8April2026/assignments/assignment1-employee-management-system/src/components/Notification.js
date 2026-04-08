import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification, selectNotification } from '../redux/uiSlice';
import './Notification.css';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 2200);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  return (
    <aside className={`notification ${notification.type || 'info'}`}>
      {notification.message}
    </aside>
  );
};

export default Notification;
