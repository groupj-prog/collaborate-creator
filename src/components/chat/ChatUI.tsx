
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatMessage from "@/components/chat/ChatMessage";
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

interface ChatUIProps {
  userType: string | null;
}

const ChatUI: React.FC<ChatUIProps> = ({ userType }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Fetch user profile to get name
    const fetchUserName = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setUserName(data.full_name || user.email || "User");
      }
    };

    fetchUserName();
    
    // For demo, load some sample messages
    const sampleMessages: Message[] = [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        sender_id: "support-1",
        sender_name: "Support Team",
        is_support: true,
        created_at: new Date(Date.now() - 60000).toISOString(),
      }
    ];
    
    setMessages(sampleMessages);
  }, [user]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: user.id,
      sender_name: userName,
      is_support: false,
      created_at: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate support agent typing
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateSupportResponse(userType, newMessage),
        sender_id: "support-1",
        sender_name: "Support Team",
        is_support: true,
        created_at: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, supportResponse]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
  };

  const generateSupportResponse = (userType: string | null, message: string): string => {
    // Simple response logic based on user type and message content
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      return userType === "creator" 
        ? "As a creator, you can check our guide on how to showcase your portfolio and set your rates. Is there anything specific you'd like help with?" 
        : "As a client, you can browse creators, post jobs, and communicate through our messaging system. What would you like to know more about?";
    }
    
    if (lowerMessage.includes("payment") || lowerMessage.includes("pricing")) {
      return "Our payment system is secure and supports multiple currencies including MMK. All transactions have a 5% platform fee. Would you like more details?";
    }
    
    if (lowerMessage.includes("problem") || lowerMessage.includes("issue")) {
      return "I'm sorry you're experiencing problems. Could you provide more details about the issue so I can help troubleshoot?";
    }
    
    return "Thank you for your message. Is there anything else you'd like to know about our platform?";
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b bg-[#F2CFD7]/20">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/support-avatar.png" />
            <AvatarFallback className="bg-[#3D6E65] text-white">ST</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Support Team</h3>
            <p className="text-xs text-muted-foreground">Online • Typically replies in minutes</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.sender_id === user?.id}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5">
              <AvatarFallback className="bg-[#3D6E65] text-white">ST</AvatarFallback>
            </Avatar>
            <div className="bg-muted px-4 py-2 rounded-lg max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: "600ms"}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t flex items-end gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-shrink-0"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </Button>
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
          className="bg-[#F2CFD7] hover:bg-[#F2CFD7]/80 text-black h-10 w-10 p-0 flex-shrink-0"
          onClick={handleSendMessage}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatUI;
