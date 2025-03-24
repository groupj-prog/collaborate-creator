
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, DollarSign, Tag, User, Clock } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

// Extend the Jobs type to include the new fields we added in SQL
type Job = Tables<"jobs"> & {
  category?: string | null;
  deadline?: string | null;
  profiles?: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientInfo, setClientInfo] = useState<{
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      // Fetch job details
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();
      
      if (jobError) {
        throw jobError;
      }
      
      if (!jobData) {
        navigate("/jobs");
        toast({
          title: "Project not found",
          description: "The project you're looking for doesn't exist or has been removed",
          variant: "destructive",
        });
        return;
      }
      
      setJob(jobData as Job);
      
      // If there's a client_id, fetch client details
      if (jobData.client_id) {
        const { data: clientData, error: clientError } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url")
          .eq("id", jobData.client_id)
          .single();
        
        if (!clientError && clientData) {
          setClientInfo(clientData);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error fetching project details",
        description: error.message || "Failed to load project details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatBudget = (budget: number | null) => {
    if (budget === null) return "Budget not specified";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isOwner = user?.id === job?.client_id;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading project details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Project Not Found</CardTitle>
              <CardDescription>
                The project you're looking for doesn't exist or has been removed.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                onClick={() => navigate("/jobs")}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Browse Projects
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/jobs")}
            className="text-sm"
          >
            ← Back to Projects
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {job.category || "Uncategorized"}
                </CardDescription>
              </div>
              {isOwner && (
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/edit-job/${job.id}`)}
                >
                  Edit Project
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-lg">{formatBudget(job.budget)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-lg">{job.deadline ? formatDate(job.deadline) : "No deadline"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Posted</p>
                  <p className="text-lg">{formatTimestamp(job.created_at)}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <div className="bg-muted/20 p-4 rounded-md whitespace-pre-line">
                {job.description || "No description provided."}
              </div>
            </div>
            
            {clientInfo && (
              <div>
                <h3 className="text-lg font-medium mb-2">Client</h3>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 text-pink-800 rounded-full p-2">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {clientInfo.full_name || clientInfo.username || "Anonymous"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t p-6">
            {user ? (
              isOwner ? (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/jobs")}
                  className="w-full sm:w-auto"
                >
                  View All Projects
                </Button>
              ) : (
                <Button 
                  className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600"
                >
                  Apply for This Project
                </Button>
              )
            ) : (
              <div className="w-full">
                <p className="text-muted-foreground mb-2 text-center sm:text-left">
                  Log in to apply for this project
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => navigate("/login")}
                    className="flex-1 sm:flex-none bg-pink-500 hover:bg-pink-600"
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={() => navigate("/register")}
                    variant="outline" 
                    className="flex-1 sm:flex-none"
                  >
                    Register
                  </Button>
                </div>
              </div>
            )}
            
            {isOwner && (
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto"
                onClick={async () => {
                  try {
                    const { error } = await supabase
                      .from("jobs")
                      .delete()
                      .eq("id", job.id);
                    
                    if (error) throw error;
                    
                    toast({
                      title: "Project deleted",
                      description: "Your project has been removed successfully",
                    });
                    
                    navigate("/jobs");
                  } catch (error: any) {
                    toast({
                      title: "Error deleting project",
                      description: error.message || "Failed to delete project",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Delete Project
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
