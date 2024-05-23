import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllUsers } from '../services/userService';
import './style.css';
import { createChat } from '../services/chatService';
import ProgressBar from '../components/ProgressBar';
import { toast } from 'react-toastify';

const UserListModal = ({ open, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const fetchAllUsers = () => {
    getAllUsers({ search: searchTerm })
      .then((data) => {
        console.log('first', data);
        setFilteredUsers(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, [searchTerm]);

  const createNewChat = (data) => {
    setSpinner(true);
    createChat(data)
      .then((data) => {
        setSpinner(false);
        toast.success('Chat Created');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error || 'Something Went Wrong');
        handleClose();
        setSpinner(false);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-list-modal-title"
        aria-describedby="user-list-modal-description"
      >
        <Box sx={modalStyle}>
          <Box>{spinner && <ProgressBar />}</Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" id="user-list-modal-title">
              User List
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List>
            {filteredUsers.map((user) => (
              <ListItem
                key={user?._id}
                className="single-user-data"
                role="button"
                onClick={() => createNewChat({ users: [user?._id] })}
              >
                <ListItemAvatar>
                  <Avatar src={user?.image} />
                </ListItemAvatar>
                <ListItemText primary={user?.name} secondary={user?.email} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export default UserListModal;
