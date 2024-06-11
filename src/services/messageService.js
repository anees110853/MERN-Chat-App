import {
  postCall,
  authorizedPostCall,
  authorizedPutCall,
  authorizedGetCall,
  authorizedDeleteCall,
} from './APIsService';

export const createMessage = async (body) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall('/message/create', body)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMessages = async ({ chatId, pageNo, pageSize }) => {
  return new Promise((resolve, reject) => {
    const url = `/message/all-messages/${chatId}?pageNo=${pageNo}&pageSize=${pageSize}`;
    authorizedGetCall(url)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
