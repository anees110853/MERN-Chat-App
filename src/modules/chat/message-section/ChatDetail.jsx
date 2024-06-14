import React, { useEffect, useState } from 'react';
import { getChatDetail } from '../../../services/chatService';
import { toast } from 'react-toastify';
import ProgressBar from '../../../components/ProgressBar';
import ChatItem from '../components/ChatItem';
import './messageSectionStyle.css';
import userImage from '../../../assets/images/group-image.png';
import { Box, Button } from '@mui/material';

const ChatDetail = ({ chatId }) => {
  const [chat, setChat] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [otherUser, setOtherUser] = useState();

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchChatDetail = () => {
    setSpinner(true);
    getChatDetail(chatId)
      .then((data) => {
        console.log('chatDetail', data);
        setChat(data?.data[0]);
        setOtherUser(
          data?.data[0]?.users?.filter(
            (chatUser) => chatUser?._id !== user?._id
          )
        );
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
        toast.error('Something Went Wrong');
      });
  };

  useEffect(() => {
    fetchChatDetail();
  }, [chatId]);

  return (
    <>
      {spinner && <ProgressBar />}
      <div className="chat-icon-section">
        <img
          className="chat-icon"
          src={!chat?.isGroup ? otherUser && otherUser[0]?.image : userImage}
          alt=""
        />
      </div>
      <div className="chat-name">
        {chat?.isGroup ? chat?.groupName : otherUser && otherUser[0]?.name}
      </div>

      {!chat?.isGroup && otherUser && (
        <div className="email-text"> {otherUser[0]?.email}</div>
      )}

      <div className="user-section">
        {chat?.isGroup &&
          chat?.users?.map((user) => {
            return (
              <ChatItem
                name={user?.name}
                avatar={user?.image}
                isAdmin={user?._id === chat?.creator}
              />
            );
          })}
      </div>

      {chat?.isGroup && user?._id === chat?.creator && (
        <div className="buttons">
          <Box className="action-buttons">
            <Button
              variant="contained"
              color="success"
              href="#contained-buttons"
            >
              Edit
            </Button>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default ChatDetail;
