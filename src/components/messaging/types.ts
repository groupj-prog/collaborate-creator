
export type MessageContact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

export type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
};
