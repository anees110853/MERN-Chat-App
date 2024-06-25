import React, { useState, useEffect, useRef } from 'react';
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
  Checkbox,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllUsers } from '../services/userService';
import './style.css';
import { createChat } from '../services/chatService';
import ProgressBar from '../components/ProgressBar';
import { toast } from 'react-toastify';

const CreateGroupModal = ({ open, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [groupData, setGroupData] = useState({
    groupName: '',
    users: [],
    isGroup: true,
  });
  const [bounceSearch, setBounceSearch] = useState('');
  const searchTimeoutRef = useRef(null);

  const fetchAllUsers = () => {
    getAllUsers({ search: bounceSearch })
      .then((data) => {
        setFilteredUsers(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, [bounceSearch]);

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

  const handleCheckboxChange = (userId) => {
    setGroupData((prev) => {
      const users = prev.users.includes(userId)
        ? prev.users.filter((id) => id !== userId)
        : [...prev.users, userId];
      return { ...prev, users };
    });
  };

  const handleSubmit = () => {
    if (!groupData.groupName) {
      toast.error('Group Name Required');
      return;
    }

    if (groupData.users.length < 2) {
      toast.error('Select at least 2 users');
      return;
    }

    createNewChat(groupData);
  };

  const handleSearch = (data) => {
    setSearchTerm(data);

    clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      setBounceSearch(data);
    }, 500);
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
              New Group
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            <TextField
              label="Enter Group Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={groupData?.groupName}
              onChange={(e) =>
                setGroupData((prev) => ({ ...prev, groupName: e.target.value }))
              }
            />
          </Box>
          <TextField
            label="Search user"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Box
            sx={{
              maxHeight: 300, // Adjust height as needed
              overflowY: 'auto',
              marginTop: 2,
            }}
          >
            <List>
              {filteredUsers.map((user) => (
                <ListItem key={user?._id} className="single-user-data">
                  <ListItemAvatar>
                    <Avatar src={user?.image} />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} secondary={user?.email} />
                  <Checkbox
                    checked={groupData.users.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                    color="primary"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="action-buttons">
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              href="#contained-buttons"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Box>
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

export default CreateGroupModal;
