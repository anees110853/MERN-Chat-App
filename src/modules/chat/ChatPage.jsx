import React from 'react';
import './chatStyle.css'; // Import CSS file for styling
import ChatItemBar from './components/ChatItemBar';

const ChatPage = () => {
  return (
    <div className="chat-page-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <ChatItemBar />
      </div>

      {/* Center User Chat */}
      <div className="user-chat">
        {/* Content of User Chat */}
        User Chat
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
