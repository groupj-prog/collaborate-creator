
import React from "react";
import { PhoneCall, Video, DollarSign } from "lucide-react";
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
  userType?: 'creator' | 'client';
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  selectedContact,
  isInCall,
  acceptCall,
  endCall,
  requestPayment,
  userType = 'creator',
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
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{userType === 'creator' ? 'Client' : 'Creator'}</p>
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
                className="h-9 w-9 text-neutral-700 dark:text-neutral-200"
              >
                <PhoneCall size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={acceptCall}
                className="h-9 w-9 text-neutral-700 dark:text-neutral-200"
              >
                <Video size={18} />
              </Button>
              {userType === 'creator' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestPayment}
                  className="text-neutral-700 dark:text-neutral-200"
                >
                  <DollarSign size={16} className="mr-1" />
                  Request Payment
                </Button>
              )}
              {userType === 'client' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestPayment}
                  className="text-neutral-700 dark:text-neutral-200"
                >
                  <DollarSign size={16} className="mr-1" />
                  Pay
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default MessageHeader;
