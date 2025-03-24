
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ChatButton = () => {
  const [unreadCount, setUnreadCount] = useState(3);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChatClick = () => {
    if (user) {
      // Navigate to the appropriate messages page based on user type
      const messagePath = localStorage.getItem("userType") === "creator" 
        ? "/creator-messages" 
        : "/client-messages";
      navigate(messagePath);
    } else {
      navigate("/login");
    }
  };

  return (
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
  );
};

export default ChatButton;
