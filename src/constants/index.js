export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FILE_SIZE = 10000000;
export const MIN_FILE_SIZE = 5000000;

export const SOCKET_EVENTS = {
  re_fetch_chats: 'RE_FETCH_CHATS',
  re_fetch_messages: 'RE_FETCH_MESSAGES',
};
