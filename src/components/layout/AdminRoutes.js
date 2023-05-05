import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <>
      {
        (token && user && user.role === 'admin') ?
          {
            ...children
          }
          : <Navigate to='/lectures' />
      }
    </>
  )

}

export default AdminRoutes