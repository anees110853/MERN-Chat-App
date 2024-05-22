import React from 'react';
import userImage from '../../../assets/images/user-profile.png';
import './styles.css';
const ChatItem = ({ user }) => {
  const { avatar, name } = user;

  return (
    <div className="chat-item">
      <img
        src={avatar ? avatar : userImage}
        alt={name}
        className="avatar-image"
      />

      <p className="user-name">{name}</p>
    </div>
  );
};

export default ChatItem;
