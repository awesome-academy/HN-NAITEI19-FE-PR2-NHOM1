import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAdmin() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <>
      {user?.role === 'admin' ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
}

export default RequireAdmin;
