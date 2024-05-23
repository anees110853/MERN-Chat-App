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
