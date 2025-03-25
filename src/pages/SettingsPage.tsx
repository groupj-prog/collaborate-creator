
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>

            <SettingsTabs />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
