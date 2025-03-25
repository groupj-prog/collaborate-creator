
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Manage your theme preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="font-medium">Dark Mode</span>
          </div>
          <Switch 
            checked={theme === "dark"} 
            onCheckedChange={toggleTheme} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
