import {
  postCall,
  authorizedPostCall,
  authorizedPutCall,
  authorizedGetCall,
  authorizedDeleteCall,
} from './APIsService';

export const createChat = async (body) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall('/chat/create_chat', body)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMyChats = async () => {
  return new Promise((resolve, reject) => {
    authorizedGetCall('/chat/get_my_chats')
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getChatDetail = async (chatId) => {
  return new Promise((resolve, reject) => {
    authorizedGetCall(`/chat/get_chat_detail/${chatId}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
