
import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <div className="p-4 border-t flex items-end gap-2 mt-auto">
      <Textarea
        placeholder="Type your message..."
        className="min-h-[80px] resize-none"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Button
        className="bg-pink-500 hover:bg-pink-600 h-10 w-10 p-0 flex-shrink-0"
        onClick={handleSendMessage}
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default MessageInput;
