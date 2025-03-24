
import React from "react";
import { MessageSquare } from "lucide-react";

const EmptyMessageState: React.FC = () => {
  return (
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
  );
};

export default EmptyMessageState;
