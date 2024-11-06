import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication token from local storage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
      {/* You can display a message or spinner while logging out */}
    </div>
  );
};

export default Logout;
