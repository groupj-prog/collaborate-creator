
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import AccountSettings from "./AccountSettings";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="appearance" className="w-full flex flex-col space-y-6">
      <TabsList className="self-start">
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="appearance" className="w-full">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="notifications" className="w-full">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="security" className="w-full">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="account" className="w-full">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
