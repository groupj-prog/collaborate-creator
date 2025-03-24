
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorSidebar from "@/components/CreatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const CreatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user is a creator
    const checkUserRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();
      
      if (data?.user_type !== 'creator') {
        // Redirect non-creators
        navigate("/");
      }
    };

    checkUserRole();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <CreatorSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Manage your portfolio, projects, and client messages all in one place.
            </p>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Recent Projects</TabsTrigger>
                <TabsTrigger value="messages">Recent Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Portfolio Items</CardTitle>
                      <CardDescription>Your showcased work</CardDescription>
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
                      <CardTitle className="text-lg">Unread Messages</CardTitle>
                      <CardDescription>Client communications</CardDescription>
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
                      onClick={() => navigate("/creator-portfolio")}
                    >
                      <h3 className="font-medium mb-1">Add Portfolio Item</h3>
                      <p className="text-sm text-muted-foreground">Showcase your best work</p>
                    </div>
                    
                    <div 
                      className="p-4 bg-muted/40 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => navigate("/jobs")}
                    >
                      <h3 className="font-medium mb-1">Browse Projects</h3>
                      <p className="text-sm text-muted-foreground">Find new opportunities</p>
                    </div>
                    
                    <div 
                      className="p-4 bg-muted/40 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => navigate("/creator-messages")}
                    >
                      <h3 className="font-medium mb-1">Check Messages</h3>
                      <p className="text-sm text-muted-foreground">Respond to client inquiries</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Completion</CardTitle>
                    <CardDescription>Complete your profile to attract more clients</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-pink-500 w-[25%]"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Your profile is 25% complete. Add portfolio items to increase visibility.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Your most recent completed projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">You haven't completed any projects yet.</p>
                      <p className="text-sm text-muted-foreground">When you complete projects, they will appear here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Your latest client communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No messages yet.</p>
                      <p className="text-sm text-muted-foreground">When clients send you messages, they will appear here.</p>
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

export default CreatorDashboard;
