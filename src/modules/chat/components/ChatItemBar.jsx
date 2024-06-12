import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import './styles.css';
import { getMyChats } from '../../../services/chatService';
import ProgressBar from '../../../components/ProgressBar';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { SOCKET_EVENTS } from '../../../constants';
const socket = io('http://localhost:4000');

const ChatItemBar = ({ setChatId }) => {
  const [chats, setChats] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedChat, seSelectedChat] = useState();

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchChats = () => {
    setSpinner(true);
    getMyChats()
      .then((data) => {
        setChats(data?.data);
        setSpinner(false);
        setChatId(data?.data[0]?._id);
      })
      .catch((error) => {
        toast.error('Something Went Wrong');
        setSpinner(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchChats();

    socket.on('connection', (data) => {
      console.log('connected');
    });

    socket.on(SOCKET_EVENTS.re_fetch_chats, (data) => {
      console.log('first', data);
      if (data?.ids?.includes(user?._id)) {
        fetchChats();
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {spinner && <ProgressBar />}
      {chats?.map((chat) => {
        return (
          <div
            key={chat?._id}
            role="button"
            onClick={() => {
              setChatId(chat?._id);
              seSelectedChat(chat?._id);
            }}
            className={`chat-item-section ${
              chat?._id === selectedChat && 'active-chat'
            }`}
          >
            <ChatItem
              name={chat?.isGroup ? chat?.groupName : chat?.users[0]?.name}
              avatar={!chat?.isGroup && chat?.users[0]?.image}
            />
          </div>
        );
      })}
    </>
  );
};

export default ChatItemBar;
