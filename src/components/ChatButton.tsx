
import React, { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ChatButton = () => {
  const [unreadCount, setUnreadCount] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  
  // Sample messages data
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hi there! How can I help you today?",
      sender: "support",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isOwn: false
    },
    {
      id: "2",
      content: "I'm looking for information about creator accounts.",
      sender: "user",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isOwn: true
    },
    {
      id: "3",
      content: "Sure! Creator accounts allow you to showcase your portfolio and receive job offers. Would you like me to guide you through the setup?",
      sender: "support",
      timestamp: new Date(Date.now() - 1700000).toISOString(),
      isOwn: false
    }
  ]);

  const handleChatClick = () => {
    if (user) {
      setIsOpen(true);
      // Reset unread count when opening the chat
      setUnreadCount(0);
    } else {
      // If not logged in, we could show a login prompt or a simplified chat
      setIsOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "user",
        timestamp: new Date().toISOString(),
        isOwn: true
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage("");
      
      // Simulate reply after a short delay
      setTimeout(() => {
        const supportMessage = {
          id: (Date.now() + 1).toString(),
          content: "Thanks for your message! Our team will get back to you soon.",
          sender: "support",
          timestamp: new Date().toISOString(),
          isOwn: false
        };
        
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleChatClick}
          className="h-14 w-14 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg flex items-center justify-center relative"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md h-[500px] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
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
            ))}
          </div>
          
          <div className="p-4 border-t flex items-end gap-2">
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatButton;
