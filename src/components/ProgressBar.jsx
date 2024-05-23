import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

const ProgressBar = () => {
  return (
    <div className="spinner-container">
      <CircularProgress className="spinner" />
    </div>
  );
};

export default ProgressBar;
