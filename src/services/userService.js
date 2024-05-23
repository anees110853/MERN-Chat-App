import {
  postCall,
  authorizedPostCall,
  authorizedPutCall,
  authorizedGetCall,
  authorizedDeleteCall,
} from './APIsService';

export const getAllUsers = async (body) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall('/user/all_users', body)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
