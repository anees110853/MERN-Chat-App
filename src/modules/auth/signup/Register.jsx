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
import userAvatar from '../../../assets/images/user-profile.png';
import { getBase64 } from '../../../services/utilities';
import {
  EMAIL_REGEX,
  MIN_FILE_SIZE,
  PASSWORD_REGEX,
} from '../../../constants/index';
import { toast } from 'react-toastify';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { signup } from '../../../services/authService';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ProgressBar from '../../../components/ProgressBar';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {
  const fileInputRef = useRef(null);
  const [userImage, setUserImage] = useState();
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      firstName: data?.get('firstName'),
      lastName: data?.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      image: userImage,
    };

    if (!user?.firstName || !user.lastName || !user.email || !user.password) {
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
    signup(user)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('access_token', data?.access_token);
        navigate('/home-page');
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something Went Wrong');
        setSpinner(false);
      });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile?.size >= MIN_FILE_SIZE) {
      toast.error('File Size should be less than 5MB');
      return;
    }

    let fileImage;
    const file = await getBase64(selectedFile);
    fileImage = file;
    setUserImage(file);
  };

  const handleImageRemove = (event, indexToRemove) => {
    event.preventDefault();
    setUserImage(null);
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              color={'primary'}
              fontWeight={500}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/* {userImage && (
                  <div className="cross-icon">
                    <CloseOutlinedIcon className="cross-icon" />
                  </div>
                )} */}
                <Box item className="avatar-grid" onClick={handleAvatarClick}>
                  {/* <span className="remove-icon">x</span> */}
                  <img
                    src={userImage ? userImage : userAvatar}
                    alt="Avatar"
                    className="avatar-image1"
                  />
                  <CameraAltOutlinedIcon className="camera-icon" />
                </Box>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="image"
                    type="file"
                    id="image"
                    inputRef={fileInputRef}
                    style={{ display: 'none' }} // Hide the file input
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>
                    First Name<span className="required-icon">*</span>
                  </InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    autoFocus
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>
                    Last Name<span className="required-icon">*</span>
                  </InputLabel>

                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    size="small"
                  />
                </Grid>
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
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password<span className="required-icon">*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
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
                    size="small"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
