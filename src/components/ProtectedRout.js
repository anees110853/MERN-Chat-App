// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const access_token = localStorage.getItem('access_token');

  return access_token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
