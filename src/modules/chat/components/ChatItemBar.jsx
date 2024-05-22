import React from 'react';
import ChatItem from './ChatItem';
import './styles.css';

const ChatItemBar = () => {
  const randomData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael@example.com',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFXyUK2ruN63qvxld3PCTI1oQmNgAjbpeG69ghMI71Q&s',
    },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com' },
    { id: 5, name: 'William Taylor', email: 'william@example.com' },
    {
      id: 6,
      name: 'Olivia Martinez',
      email: 'olivia@example.com',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFXyUK2ruN63qvxld3PCTI1oQmNgAjbpeG69ghMI71Q&s',
    },
    {
      id: 7,
      name: 'James Anderson',
      email: 'james@example.com',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSuEUr_cUWiTzZC4YmS-ra61Wp_-gTOU9oKvg2ZY6A8g&s',
    },
    { id: 8, name: 'Sophia Wilson', email: 'sophia@example.com' },
    { id: 9, name: 'Benjamin Thomas', email: 'benjamin@example.com' },
    { id: 10, name: 'Emma Garcia', email: 'emma@example.com' },
  ];

  return (
    <>
      {randomData.map((user) => {
        return (
          <div
            key={user?.id}
            role="button"
            onClick={() => console.log(user?.id)}
            className="chat-item-section"
          >
            <ChatItem user={user} />
          </div>
        );
      })}
    </>
  );
};

export default ChatItemBar;
