
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatUI from "@/components/chat/ChatUI";
import { useToast } from "@/components/ui/use-toast";

const LiveChat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserType = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setUserType(data.user_type);
      } else {
        toast({
          title: "Error",
          description: "Could not retrieve user information",
          variant: "destructive",
        });
      }
    };

    fetchUserType();
  }, [user, navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Live Chat Support</h1>
          <p className="text-muted-foreground mb-8">
            Chat with our support team in real-time
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <ChatUI userType={userType} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveChat;
