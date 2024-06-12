import React, { useEffect, useState, useRef } from 'react';
import { getMessages } from '../../../services/messageService';
import './messageSectionStyle.css';
import io from 'socket.io-client';
import { SOCKET_EVENTS } from '../../../constants';
import moment from 'moment';

const socket = io('http://localhost:4000');

const MessageView = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState();

  const chatContainerRef = useRef(null);

  const setData = (data) => {
    setMessages((prev) => [...prev, ...data]);
  };

  const fetchMessages = (pageNo) => {
    getMessages({
      chatId,
      pageNo,
      pageSize,
    })
      .then((data) => {
        console.log(data);
        setData(data?.data);
        setPageCount(data?.meta?.total_pages);
        setPageNo(data?.meta?.current_page);
        setPageSize(data?.meta?.per_page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId, pageSize]);

  useEffect(() => {
    setPageNo(1);
    setPageSize(10);
    setPageCount(null);
  }, [chatId]);

  useEffect(() => {
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="chat-container"
      ref={chatContainerRef}
      onScroll={(event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
          if (pageCount > pageNo) {
            fetchMessages(pageNo + 1);
            setPageNo(pageNo + 1);
          }
        }
      }}
    >
      {messages?.map((message) => (
        <div
          className={
            user?._id === message?.sender ? 'sender-class' : 'receiver-class'
          }
          key={message?._id}
        >
          <div className="message-header">
            <strong>{message.senderName}</strong>
            <span className="message-date">
              {moment(message.createdAt).format('hh:mm A')}
            </span>
          </div>
          <div className="message-body">{message?.message}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageView;
