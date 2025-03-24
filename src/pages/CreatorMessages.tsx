
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorSidebar from "@/components/CreatorSidebar";
import ContactsList from "@/components/messaging/ContactsList";
import MessageHeader from "@/components/messaging/MessageHeader";
import MessageContent from "@/components/messaging/MessageContent";
import MessageInput from "@/components/messaging/MessageInput";
import EmptyMessageState from "@/components/messaging/EmptyMessageState";
import { MessageContact, Message } from "@/components/messaging/types";

const CreatorMessages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<MessageContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<MessageContact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInCall, setIsInCall] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user is a creator
    const checkUserRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (data?.user_type !== 'creator') {
        // Redirect non-creators
        navigate("/");
      }
    };

    checkUserRole();
    
    // For demo purposes, we'll add sample contacts
    setContacts([
      {
        id: '1',
        name: 'John Smith',
        avatar: '',
        lastMessage: 'I was impressed by your portfolio...',
        time: '2h ago',
        unread: true
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: '',
        lastMessage: 'Can we discuss the project budget?',
        time: '1d ago',
        unread: false
      }
    ]);
  }, [user, navigate]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const newMessageObj: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'me',
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your response! I'm interested in discussing this project further.",
        sender: selectedContact.id,
        timestamp: new Date().toISOString(),
        isOwn: false
      };
      
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const selectContact = (contact: MessageContact) => {
    setSelectedContact(contact);
    setIsInCall(false);
    
    // For demo purposes, add sample messages
    if (contact.id === '1') {
      setMessages([
        {
          id: '1',
          content: "Hello! I saw your portfolio and I'm interested in hiring you for a web design project. Do you have availability in the next few weeks?",
          sender: contact.id,
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          isOwn: false
        }
      ]);
    } else if (contact.id === '2') {
      setMessages([
        {
          id: '1',
          content: "Hi, I need a logo designed for my new startup. What's your rate for logo design?",
          sender: contact.id,
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          isOwn: false
        }
      ]);
    } else {
      setMessages([]);
    }
  };

  const acceptCall = () => {
    if (!selectedContact) return;
    
    toast({
      title: "Call Accepted",
      description: `You are now in a call with ${selectedContact.name}`,
    });
    
    setIsInCall(true);
  };

  const endCall = () => {
    toast({
      title: "Call Ended",
      description: "The call has been terminated",
    });
    
    setIsInCall(false);
  };

  const requestPayment = () => {
    if (!selectedContact) return;
    
    toast({
      title: "Payment Request Sent",
      description: `Payment request has been sent to ${selectedContact.name}`,
    });
    
    // Add a message about the payment request
    const paymentRequestMsg: Message = {
      id: Date.now().toString(),
      content: "I've sent you a payment request for our services. Please complete the payment to continue.",
      sender: 'me',
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    
    setMessages(prev => [...prev, paymentRequestMsg]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <CreatorSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground mb-8">
              Communicate with clients about projects and opportunities
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contacts List */}
              <ContactsList 
                contacts={contacts}
                selectedContact={selectedContact}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectContact={selectContact}
              />

              {/* Message Thread */}
              <Card className="md:col-span-2 flex flex-col h-[calc(100vh-240px)]">
                {selectedContact ? (
                  <>
                    <MessageHeader 
                      selectedContact={selectedContact}
                      isInCall={isInCall}
                      acceptCall={acceptCall}
                      endCall={endCall}
                      requestPayment={requestPayment}
                    />

                    <MessageContent 
                      messages={messages}
                      isInCall={isInCall}
                      selectedContact={selectedContact}
                    />

                    {!isInCall && (
                      <MessageInput 
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                      />
                    )}
                  </>
                ) : (
                  <EmptyMessageState />
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreatorMessages;
