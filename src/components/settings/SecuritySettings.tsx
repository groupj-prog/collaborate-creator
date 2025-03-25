
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const SecuritySettings = () => {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const handleUpdatePassword = () => {
    // Placeholder for updating password
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Change Password</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and a new password to update your credentials.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form className="space-y-4 py-4">
                    <div className="space-y-2">
                      <div className="font-medium">Current Password</div>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">New Password</div>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">Confirm New Password</div>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                  </form>
                </Form>
                <DialogFooter>
                  <Button onClick={handleUpdatePassword}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
