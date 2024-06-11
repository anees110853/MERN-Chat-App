import React, { useEffect, useState } from 'react';
import { getMessages } from '../../../services/messageService';
import './messageSectionStyle.css';
import io from 'socket.io-client';
import { SOCKET_EVENTS } from '../../../constants';

const socket = io('http://localhost:4000');

const MessageView = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const fetchMessages = () => {
    getMessages({
      chatId,
      pageNo,
      pageSize,
    })
      .then((data) => {
        console.log(data);
        setMessages(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    console.log('before connection');
    socket.connect();

    socket.on('connection', (data) => {
      console.log('chat connected');
    });

    const handleReFetchMessages = (data) => {
      console.log('data in sockets', data);
      if (data?.chatId === chatId) {
        fetchMessages();
      }
    };

    socket.on(SOCKET_EVENTS.re_fetch_messages, handleReFetchMessages);

    return () => {
      socket.off(SOCKET_EVENTS.re_fetch_messages, handleReFetchMessages);
      socket.disconnect();
      console.log('disconnected');
    };
  }, [chatId]);

  return (
    <>
      <div className="chat-container">
        {messages?.map((message) => (
          <div
            className={
              user?._id === message?.sender ? 'sender-class' : 'receiver-class'
            }
            key={message?._id}
          >
            {message?.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageView;
