import React, { useState } from 'react';
import './chatStyle.css'; // Import CSS file for styling
import ChatItemBar from './components/ChatItemBar';
import MessagesSection from './message-section/MessagesSection';

const ChatPage = () => {
  const [chatId, setChatId] = useState();
  return (
    <div className="chat-page-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <ChatItemBar setChatId={setChatId} />
      </div>

      {/* Center User Chat */}
      <div className="user-chat">
        {/* Content of User Chat */}
        <MessagesSection chatId={chatId} />
      </div>

      {/* Right Profile View */}
      <div className="profile-view">
        {/* Content of Right Profile View */}
        Right Profile View
      </div>
    </div>
  );
};

export default ChatPage;
