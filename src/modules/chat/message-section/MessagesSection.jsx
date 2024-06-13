import React, { useEffect, useState } from 'react';
import './messageSectionStyle.css';
import ChatItem from '../components/ChatItem';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getChatDetail } from '../../../services/chatService';
import ProgressBar from '../../../components/ProgressBar';
import userImage from '../../../assets/images/user-profile.png';
import MessageView from './MessageView';
import { createMessage } from '../../../services/messageService';

const MessagesSection = ({ chatId }) => {
  const [spinner, setSpinner] = useState(false);
  const [chat, setChat] = useState();
  const [member, setMember] = useState();
  const [text, setText] = useState('');

  const sender = JSON.parse(localStorage.getItem('user'));

  const fetchChatDetail = () => {
    setSpinner(true);
    getChatDetail(chatId)
      .then((data) => {
        setChat(data?.data[0]);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  useEffect(() => {
    fetchChatDetail();
  }, [chatId]);

  useEffect(() => {
    console.log('chat', chat);

    if (chat && chat?.isGroup) {
      setMember({
        name: chat?.groupName,
      });
    } else if (chat?.users?.length) {
      const foundUser = chat?.users?.find((user) => user?._id !== sender?._id);
      setMember(foundUser);
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (!text) {
      return;
    }
    setSpinner(true);
    createMessage({
      chatId: chat?._id,
      sender: sender?._id,
      text: text,
    })
      .then((data) => {
        setText('');
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  return (
    <>
      {spinner && <ProgressBar />}

      <div className="message-container">
        {/* Header Section */}
        <div className="message-header-section">
          <div>
            <img
              src={member?.image ? member.image : userImage}
              alt=""
              className="avatar-image"
            />
          </div>
          <div>
            <h2>{member?.name}</h2>
          </div>
        </div>

        {/* Messages Section */}
        <div className="message-body-section">
          <MessageView chatId={chat?._id} />
        </div>

        {/* message footer input section */}
        <div className="message-footer-section">
          <Grid>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              fullWidth
              size="medium"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSendMessage}
                    //   onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter text here"
              onChange={(data) => setText(data.target.value)}
              // key={text}
              value={text}
            />
          </Grid>
        </div>
      </div>
    </>
  );
};

export default MessagesSection;
