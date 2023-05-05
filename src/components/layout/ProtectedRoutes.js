import react, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return (
    <>
      {(token && user) ? (
        {
          ...children
        }
      ) : (
        <Navigate to="/signin" replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
