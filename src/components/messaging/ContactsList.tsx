
import React from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

type MessageContact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

interface ContactsListProps {
  contacts: MessageContact[];
  selectedContact: MessageContact | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectContact: (contact: MessageContact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContact,
  searchTerm,
  setSearchTerm,
  selectContact,
}) => {
  return (
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
  );
};

export default ContactsList;
