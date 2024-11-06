import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (Component) => {
  const AuthRedirectComponent = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (
        !token &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/signup'
      ) {
        navigate('/login');
      }
    }, [token, navigate]);

    return <Component {...props} />;
  };

  return AuthRedirectComponent;
};

export default withAuthRedirect;
