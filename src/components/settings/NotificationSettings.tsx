
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const saveNotificationPreferences = () => {
    // Placeholder for saving notification preferences
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Email Notifications</FormLabel>
              <FormDescription>Receive notifications about your account via email</FormDescription>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Marketing Emails</FormLabel>
              <FormDescription>Receive emails about new features and opportunities</FormDescription>
            </div>
            <Switch 
              checked={marketingEmails} 
              onCheckedChange={setMarketingEmails} 
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button onClick={saveNotificationPreferences}>
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
