
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Search, Video, PhoneCall, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import PaymentDialog from "@/components/messaging/PaymentDialog";
import MessageHeader from "@/components/messaging/MessageHeader";

type MessageContact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
};

const ClientMessages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<MessageContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<MessageContact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInCall, setIsInCall] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const checkUserRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (data?.user_type === 'creator') {
        navigate("/creator-dashboard");
      }
    };

    checkUserRole();
    
    setContacts([
      {
        id: '1',
        name: 'Jane Doe',
        avatar: '',
        lastMessage: 'I can help with your web design project...',
        time: '1h ago',
        unread: true
      },
      {
        id: '2',
        name: 'Alex Smith',
        avatar: '',
        lastMessage: 'The logo design will be ready by...',
        time: '3h ago',
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
    
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message. Would you like to discuss this over a call?",
        sender: selectedContact.id,
        timestamp: new Date().toISOString(),
        isOwn: false
      };
      
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const selectContact = (contact: MessageContact) => {
    setSelectedContact(contact);
    setSessionEnded(false);
    setIsInCall(false);
    
    setRating(0);
    setReview("");
    
    if (contact.id === '1') {
      setMessages([
        {
          id: '1',
          content: "Hello! I'm interested in your web design services. Can you tell me more about your rates?",
          sender: 'me',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isOwn: true
        },
        {
          id: '2',
          content: "Hi there! My rates start at $50/hour for basic web design, and I offer package deals for complete projects. What kind of website are you looking to build?",
          sender: contact.id,
          timestamp: new Date(Date.now() - 3540000).toISOString(),
          isOwn: false
        },
        {
          id: '3',
          content: "I've sent you a payment request for our services. Please click here to complete the payment: [Payment Link]",
          sender: contact.id,
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          isOwn: false
        }
      ]);
    } else if (contact.id === '2') {
      setMessages([
        {
          id: '1',
          content: "I need a new logo for my business. Can you help?",
          sender: 'me',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          isOwn: true
        },
        {
          id: '2',
          content: "Absolutely! I specialize in logo design. What's your business about and do you have any color preferences?",
          sender: contact.id,
          timestamp: new Date(Date.now() - 10740000).toISOString(),
          isOwn: false
        }
      ]);
    } else {
      setMessages([]);
    }
  };

  const initiateCall = () => {
    if (!selectedContact) return;
    
    toast({
      title: "Initiating Call",
      description: `Connecting with ${selectedContact.name}...`,
    });
    
    setTimeout(() => {
      setIsInCall(true);
      toast({
        title: "Call Connected",
        description: `You are now in a call with ${selectedContact.name}`,
      });
    }, 1500);
  };

  const endCall = () => {
    toast({
      title: "Call Ended",
      description: "Please rate your session with the creator",
    });
    
    setIsInCall(false);
    setSessionEnded(true);
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  const submitReview = () => {
    if (!selectedContact) return;
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    
    console.log(`Review for ${selectedContact.name}: ${rating} stars - "${review}"`);
    
    setSessionEnded(false);
  };

  const processPayment = () => {
    if (!selectedContact) return;
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    if (!selectedContact) return;
    
    const paymentMessage: Message = {
      id: Date.now().toString(),
      content: "I've completed the payment for your services. Thank you!",
      sender: 'me',
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    
    setMessages(prev => [...prev, paymentMessage]);
    
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your payment! I'll continue working on your project right away.",
        sender: selectedContact.id,
        timestamp: new Date().toISOString(),
        isOwn: false
      };
      
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  // Helper function to detect payment request messages and make them clickable
  const renderMessageContent = (message: Message) => {
    if (message.content.includes("payment request") && message.content.includes("[Payment Link]")) {
      return (
        <>
          {message.content.split("[Payment Link]")[0]}
          <span 
            className="text-pink-500 underline cursor-pointer" 
            onClick={processPayment}
          >
            [Process Payment]
          </span>
        </>
      );
    }
    
    return message.content;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-neutral-800 dark:text-white">Messages</h1>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              Communicate with creators about your projects
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 overflow-hidden">
                <CardHeader className="px-4 py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0 max-h-[calc(100vh-280px)] overflow-y-auto">
                  {contacts.length > 0 ? (
                    <div className="divide-y">
                      {contacts
                        .filter((contact) => 
                          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((contact) => (
                          <div
                            key={contact.id}
                            className={`p-4 cursor-pointer hover:bg-muted/30 transition-colors ${
                              selectedContact?.id === contact.id ? 'bg-muted/60' : ''
                            }`}
                            onClick={() => selectContact(contact)}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium truncate text-neutral-800 dark:text-white">{contact.name}</h4>
                                  <span className="text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                                    {contact.time}
                                  </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                                  {contact.lastMessage}
                                </p>
                              </div>
                              {contact.unread && (
                                <div className="w-2 h-2 rounded-full bg-pink-500" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center">
                        <MessageSquare className="text-muted-foreground" size={20} />
                      </div>
                      <h3 className="text-lg font-medium mb-1 text-neutral-800 dark:text-white">No messages yet</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        When you contact creators, your conversations will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2 flex flex-col h-[calc(100vh-240px)]">
                {selectedContact ? (
                  <>
                    <MessageHeader 
                      selectedContact={selectedContact}
                      isInCall={isInCall}
                      acceptCall={initiateCall}
                      endCall={endCall}
                      requestPayment={processPayment}
                      userType="client"
                    />

                    <CardContent className="p-6 flex-grow overflow-y-auto space-y-4">
                      {isInCall ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-24 h-24 mb-4 bg-muted/40 rounded-full flex items-center justify-center">
                            <Video className="text-muted-foreground" size={36} />
                          </div>
                          <h3 className="text-xl font-medium mb-2 text-neutral-800 dark:text-white">In Call with {selectedContact.name}</h3>
                          <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                            Your call is active. Click "End Call" when you're finished.
                          </p>
                        </div>
                      ) : sessionEnded ? (
                        <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
                          <h3 className="text-xl font-medium mb-4 text-neutral-800 dark:text-white">Rate Your Session</h3>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                type="button"
                                className={`text-2xl focus:outline-none ${
                                  value <= rating ? 'text-yellow-500' : 'text-neutral-300 dark:text-neutral-600'
                                }`}
                                onClick={() => handleRating(value)}
                              >
                                <Star fill={value <= rating ? 'currentColor' : 'none'} />
                              </button>
                            ))}
                          </div>
                          <Textarea
                            placeholder="Share your experience with this creator..."
                            className="min-h-[100px] resize-none mb-4"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                          />
                          <Button 
                            className="w-full" 
                            onClick={submitReview}
                            disabled={rating === 0}
                          >
                            Submit Review
                          </Button>
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
                              <p className="text-sm">{renderMessageContent(message)}</p>
                              <span
                                className={`text-xs block text-right mt-1 ${
                                  message.isOwn ? 'text-pink-100' : 'text-neutral-500 dark:text-neutral-400'
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

                    {!isInCall && !sessionEnded && (
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
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="max-w-xs">
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted/40 rounded-full flex items-center justify-center">
                        <MessageSquare className="text-muted-foreground" size={28} />
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-neutral-800 dark:text-white">Your Messages</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                        Select a conversation from the list to view messages and respond to creators.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      
      {selectedContact && (
        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          onClose={() => setIsPaymentDialogOpen(false)}
          recipientName={selectedContact.name}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default ClientMessages;
