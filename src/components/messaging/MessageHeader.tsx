
import React from "react";
import { PhoneCall, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

type MessageContact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

interface MessageHeaderProps {
  selectedContact: MessageContact;
  isInCall: boolean;
  acceptCall: () => void;
  endCall: () => void;
  requestPayment: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  selectedContact,
  isInCall,
  acceptCall,
  endCall,
  requestPayment,
}) => {
  return (
    <CardHeader className="px-6 py-4 border-b flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
            <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg text-neutral-800 dark:text-white">{selectedContact.name}</CardTitle>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Client</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isInCall ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={endCall}
            >
              End Call
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={acceptCall}
                className="h-9 w-9"
              >
                <PhoneCall size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={acceptCall}
                className="h-9 w-9"
              >
                <Video size={18} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={requestPayment}
              >
                Request Payment
              </Button>
            </>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default MessageHeader;
