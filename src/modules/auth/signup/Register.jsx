import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { MIN_FILE_SIZE } from '../../../constants/index';
import { toast } from 'react-toastify';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const defaultTheme = createTheme();

export default function Register() {
  const fileInputRef = useRef(null);

  const [userImage, setUserImage] = useState();

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

    console.log(user);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile?.size >= MIN_FILE_SIZE) {
      toast.error('File Size should be less than 10MB');
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

  return (
    <BackgroundLayout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WelcomeMessage text={'Welcome to Talkify'} />

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
                <Grid
                  item
                  xs={12}
                  className="avatar-grid"
                  onClick={handleAvatarClick}
                >
                  {/* <span className="remove-icon">x</span> */}
                  <img
                    src={userImage ? userImage : userAvatar}
                    alt="Avatar"
                    className="avatar-image"
                  />
                  <CameraAltOutlinedIcon className="camera-icon" />
                </Grid>
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
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
