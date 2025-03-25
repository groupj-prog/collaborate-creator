
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyAndTerms = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Information</CardTitle>
        <CardDescription>Review our Privacy Policy and Terms of Service</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <FileText className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="space-y-2 flex-1">
            <div className="text-base font-medium">Privacy Policy</div>
            <div className="text-sm text-muted-foreground mb-2">
              Learn how we collect, use, and protect your personal information
            </div>
            <Button variant="outline" asChild className="mt-2">
              <Link to="/privacy-policy">View Privacy Policy</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 pt-2">
          <BookOpen className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="space-y-2 flex-1">
            <div className="text-base font-medium">Terms and Conditions</div>
            <div className="text-sm text-muted-foreground mb-2">
              Read our terms of service for creators and clients
            </div>
            <Button variant="outline" asChild className="mt-2">
              <Link to="/terms">View Terms and Conditions</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyAndTerms;
