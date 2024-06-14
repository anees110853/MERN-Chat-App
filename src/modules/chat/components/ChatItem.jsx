import React from 'react';
import userImage from '../../../assets/images/user-profile.png';
import './styles.css';
const ChatItem = ({ name, avatar, isAdmin }) => {
  return (
    <div className="chat-item">
      <img
        src={avatar ? avatar : userImage}
        alt={name}
        className="avatar-image"
      />

      <p className="user-name">{name}</p>
      {isAdmin && <p className="admin-text">(Admin)</p>}
    </div>
  );
};

export default ChatItem;
