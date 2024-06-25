import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
