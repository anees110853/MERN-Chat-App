import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundLayout from '../../../components/BackgroundLayout';
import WelcomeMessage from '../../../components/WelcomeMessage';
import '../style.css';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../constants/index';
import { toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ProgressBar from '../../../components/ProgressBar';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get('email'),
    };

    if (!user.email) {
      toast.error('Required Mandatory Feild');
      return;
    }

    if (!EMAIL_REGEX.test(user?.email)) {
      toast.error('Invalid email format. Please enter a valid email address.');
      return false;
    }
  };

  return (
    <BackgroundLayout>
      {spinner && <ProgressBar />}
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          sx={{
            width: '30%',
          }}
        >
          <CssBaseline />
          <WelcomeMessage text={'Welcome to Talkify'} />

          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#ffffff',
              p: 5,
              borderRadius: '2%',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <KeyOffOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              color={'primary'}
              fontWeight={500}
            >
              Forgot Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              width={'100%'}
            >
              <Grid item xs={12}>
                <InputLabel>
                  Email<span className="required-icon">*</span>
                </InputLabel>

                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Forgot Password
              </Button>
              <Grid container justifyContent="space-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Sing In.
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </BackgroundLayout>
  );
}
