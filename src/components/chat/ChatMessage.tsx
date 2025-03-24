
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/components/chat/utils";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  is_support: boolean;
  created_at: string;
}

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex items-start gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
      {!isOwnMessage && (
        <Avatar className="mt-0.5">
          <AvatarImage src={message.sender_avatar} />
          <AvatarFallback className={message.is_support ? "bg-[#3D6E65] text-white" : "bg-[#F2CFD7] text-black"}>
            {message.sender_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isOwnMessage ? 'bg-[#F2CFD7] text-black' : 'bg-muted'} px-4 py-2 rounded-lg`}>
        {!isOwnMessage && (
          <p className="text-xs font-medium mb-1">{message.sender_name}</p>
        )}
        <p className="text-sm">{message.content}</p>
        <span className="text-xs block text-right mt-1 opacity-70">
          {formatRelativeTime(new Date(message.created_at))}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
