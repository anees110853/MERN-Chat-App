import { createBrowserRouter } from 'react-router-dom';
import Login from './modules/auth/login/Login';
import Register from './modules/auth/signup/Register';
import ForgotPassword from './modules/auth/forgot-password/ForgotPassword';
import ResetPassword from './modules/auth/reset-password/ResetPassword';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
