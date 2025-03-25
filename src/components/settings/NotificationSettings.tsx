
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

type NotificationPreferences = {
  emailNotifications: boolean;
  marketingEmails: boolean;
};

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const form = useForm<NotificationPreferences>({
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false
    }
  });

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
        <Form {...form}>
          <form className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive notifications about your account via email</div>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Marketing Emails</div>
                <div className="text-sm text-muted-foreground">Receive emails about new features and opportunities</div>
              </div>
              <Switch 
                checked={marketingEmails} 
                onCheckedChange={setMarketingEmails} 
              />
            </div>
          </form>
        </Form>
        
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
