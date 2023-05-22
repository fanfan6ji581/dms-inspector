import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ url: `${location.pathname}${location.search}` }} />
      )}
    </>
  );
};

export default AuthLayout;
