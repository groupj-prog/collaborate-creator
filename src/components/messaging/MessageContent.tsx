
import React from "react";
import { Video } from "lucide-react";
import { CardContent } from "@/components/ui/card";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
};

interface MessageContentProps {
  messages: Message[];
  isInCall: boolean;
  selectedContact: { name: string } | null;
}

const MessageContent: React.FC<MessageContentProps> = ({
  messages,
  isInCall,
  selectedContact,
}) => {
  return (
    <CardContent className="p-6 flex-grow overflow-y-auto space-y-4">
      {isInCall ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-24 h-24 mb-4 bg-muted/40 rounded-full flex items-center justify-center">
            <Video className="text-muted-foreground" size={36} />
          </div>
          <h3 className="text-xl font-medium mb-2">In Call with {selectedContact?.name}</h3>
          <p className="text-muted-foreground mb-6">
            Your call is active. Click "End Call" when you're finished.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.isOwn
                  ? 'bg-pink-500 text-white ml-auto'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span
                className={`text-xs block text-right mt-1 ${
                  message.isOwn ? 'text-pink-100' : 'text-muted-foreground'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))
      )}
    </CardContent>
  );
};

export default MessageContent;
