import React from 'react';
import { Typography } from '@mui/material';

const WelcomeMessage = (props) => {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        color: '#1976d2',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        background: 'linear-gradient(90deg, #1976d2, #e52e71)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        margin: '20px 0',
      }}
    >
      {props?.text}
    </Typography>
  );
};

export default WelcomeMessage;
