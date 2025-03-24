
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorSidebar from "@/components/CreatorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const CreatorMessages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<MessageContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<MessageContact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    
    // For demo purposes, we'll add a sample contact
    setContacts([
      {
        id: '1',
        name: 'John Smith',
        avatar: '',
        lastMessage: 'I was impressed by your portfolio...',
        time: '2h ago',
        unread: true
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
    } else {
      setMessages([]);
    }
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
                      {contacts.map((contact) => (
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
                                <h4 className="font-medium truncate">{contact.name}</h4>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {contact.time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
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
                      <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                      <p className="text-sm text-muted-foreground">
                        When clients contact you, their messages will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Message Thread */}
              <Card className="md:col-span-2 flex flex-col h-[calc(100vh-240px)]">
                {selectedContact ? (
                  <>
                    <CardHeader className="px-6 py-4 border-b flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">Client</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 flex-grow overflow-y-auto space-y-4">
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
                    </CardContent>

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
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="max-w-xs">
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted/40 rounded-full flex items-center justify-center">
                        <MessageSquare className="text-muted-foreground" size={28} />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                      <p className="text-muted-foreground mb-6">
                        Select a conversation from the list to view messages and respond to clients.
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
    </div>
  );
};

export default CreatorMessages;
