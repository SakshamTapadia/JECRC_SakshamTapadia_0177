import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/uiSlice';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const isLoading = useSelector(selectLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay" role="status" aria-label="loading">
      <div className="spinner" />
      <p>Processing...</p>
    </div>
  );
};

export default LoadingSpinner;
