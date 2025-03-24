
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";

const ClientSearch = () => {
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
      
      if (data?.user_type === 'creator') {
        // Redirect creators
        navigate("/creator-dashboard");
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
            <h1 className="text-3xl font-bold mb-2">Find Creators</h1>
            <p className="text-muted-foreground mb-8">
              Search for creators based on skills, experience, or project types.
            </p>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  className="pl-10 py-6 text-lg" 
                  placeholder="Search for creators by skill, portfolio, or project type..." 
                />
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Web Development", "Mobile App", "Design", "Marketing", "Writing", "Other"].map((category) => (
                  <Button 
                    key={category}
                    variant="outline" 
                    className="h-auto py-4 justify-start gap-2"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No creators found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse through categories
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientSearch;
