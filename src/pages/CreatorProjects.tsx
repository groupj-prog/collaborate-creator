
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorSidebar from "@/components/CreatorSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CreatorProjects = () => {
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">
                  View and manage your current and completed projects
                </p>
              </div>
              <Button 
                onClick={() => navigate("/jobs")}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Browse Available Projects
              </Button>
            </div>

            <Tabs defaultValue="active" className="w-full mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="active">Active Projects</TabsTrigger>
                <TabsTrigger value="completed">Completed Projects</TabsTrigger>
                <TabsTrigger value="applications">My Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                    <CardDescription>Projects you're currently working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="mb-4 mx-auto bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center">
                        <CheckSquare className="text-pink-500" size={24} />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Active Projects</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You don't have any projects in progress. Browse available projects to find your next opportunity.
                      </p>
                      <Button 
                        onClick={() => navigate("/jobs")}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        Find Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Projects</CardTitle>
                    <CardDescription>Projects you've successfully delivered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="mb-4 mx-auto bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center">
                        <CheckSquare className="text-pink-500" size={24} />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Completed Projects Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        When you complete projects, they'll appear here. This history helps build your reputation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>Projects you've applied for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="mb-4 mx-auto bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center">
                        <CheckSquare className="text-pink-500" size={24} />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Applications Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You haven't applied to any projects yet. Start by browsing available projects.
                      </p>
                      <Button 
                        onClick={() => navigate("/jobs")}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        Browse Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Projects</CardTitle>
                <CardDescription>Projects that match your skills and portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Web Development for E-commerce Platform</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$500-$1,000</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      Looking for an experienced React developer to build a modern e-commerce website with cart functionality and payment integration.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="px-2 py-1 bg-muted rounded-full">React</span>
                      <span className="px-2 py-1 bg-muted rounded-full">E-commerce</span>
                      <span className="px-2 py-1 bg-muted rounded-full">Web Development</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> Posted 2 days ago
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} /> Fixed Price
                        </span>
                      </div>
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Logo Design for Tech Startup</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$100-$300</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      Need a modern, minimalist logo for a SaaS startup in the AI space. Looking for clean design that conveys innovation.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="px-2 py-1 bg-muted rounded-full">Logo Design</span>
                      <span className="px-2 py-1 bg-muted rounded-full">Branding</span>
                      <span className="px-2 py-1 bg-muted rounded-full">Startup</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> Posted 5 days ago
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} /> Fixed Price
                        </span>
                      </div>
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreatorProjects;
