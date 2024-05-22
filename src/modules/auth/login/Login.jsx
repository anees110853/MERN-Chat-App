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
import { login } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!user.email || !user.password) {
      toast.error('Required Mandatory Feild');
      return;
    }

    if (!EMAIL_REGEX.test(user?.email)) {
      toast.error('Invalid email format. Please enter a valid email address.');
      return false;
    }

    if (!user?.password?.match(PASSWORD_REGEX)) {
      toast.error(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    setSpinner(true);
    login(user?.email, user?.password)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('access_token', data?.access_token);
        navigate('/home-page');
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <BackgroundLayout>
      {spinner && <ProgressBar />}
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          sx={{
            width: '25%',
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              color={'primary'}
              fontWeight={500}
            >
              Sign In
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
                  size="small"
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password<span className="required-icon">*</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link href="/forgot-password" variant="body2">
                    Forgot Password?
                  </Link>{' '}
                </Grid>

                <Grid item>
                  <Link href="/register" variant="body2">
                    Dont Have Account? Sing Up.
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
