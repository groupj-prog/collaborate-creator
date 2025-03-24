
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ClientPromotions from "@/components/dashboard/ClientPromotions";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user is a client
    const checkUserRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (data?.user_type !== 'client') {
        // Redirect non-clients
        navigate("/");
      }
    };

    checkUserRole();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Find creative talents and manage your projects all in one place.
            </p>

            <ClientPromotions />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">My Projects</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Active Projects</CardTitle>
                      <CardDescription>Current work in progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Completed Projects</CardTitle>
                      <CardDescription>Successfully delivered work</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Saved Creators</CardTitle>
                      <CardDescription>Talents you've bookmarked</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      className="p-4 bg-muted/40 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => navigate("/create-job")}
                    >
                      <h3 className="font-medium mb-1">Post a Job</h3>
                      <p className="text-sm text-muted-foreground">Create a new project listing</p>
                    </div>
                    
                    <div 
                      className="p-4 bg-muted/40 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => navigate("/client-search")}
                    >
                      <h3 className="font-medium mb-1">Find Creators</h3>
                      <p className="text-sm text-muted-foreground">Browse creative talent</p>
                    </div>
                    
                    <div 
                      className="p-4 bg-muted/40 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => navigate("/client-messages")}
                    >
                      <h3 className="font-medium mb-1">Check Messages</h3>
                      <p className="text-sm text-muted-foreground">Communicate with creators</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>Projects you've posted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">You haven't posted any projects yet.</p>
                      <p className="text-sm text-muted-foreground">When you post projects, they will appear here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communications with creators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No messages yet.</p>
                      <p className="text-sm text-muted-foreground">When you message creators, conversations will appear here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
