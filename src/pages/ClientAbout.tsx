
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const ClientAbout = () => {
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">About ConnectHub</h1>
            <p className="text-muted-foreground mb-8">
              Learn more about our platform and how it connects clients with creators.
            </p>

            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  ConnectHub is a platform dedicated to connecting clients with talented creators across various disciplines. 
                  Our mission is to make collaboration seamless, efficient, and rewarding for both parties.
                </p>
                <p>
                  Whether you're looking for a web developer, designer, writer, or marketer, 
                  ConnectHub provides the tools and resources to find the perfect match for your project needs.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">1. Search for creators</h3>
                  <p className="text-muted-foreground">
                    Browse through our database of talented creators or use the search function to find specific skills.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">2. Review portfolios</h3>
                  <p className="text-muted-foreground">
                    Examine creators' past work and projects to ensure they're the right fit.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">3. Contact and collaborate</h3>
                  <p className="text-muted-foreground">
                    Reach out to discuss your project needs and start working together.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">4. Complete your project</h3>
                  <p className="text-muted-foreground">
                    Finalize your project with confidence and provide feedback on your experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Get Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Need help with using ConnectHub? Our support team is here to assist you.
                </p>
                <p className="text-muted-foreground">
                  Contact us at support@connecthub.com or use the help center for common questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientAbout;
