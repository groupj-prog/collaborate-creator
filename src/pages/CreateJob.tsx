import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jobSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  budget: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0, 
    { message: "Budget must be a positive number" }
  ),
  category: z.string().min(1, { message: "Please select a category" }),
  deadline: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const CreateJob = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  
  // Categories
  const categories = ["Web Development", "Mobile App", "Design", "Marketing", "Writing", "Other"];
  
  // Initialize form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      category: "",
      deadline: "",
    },
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication required",
        description: "You need to log in to post a project",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [authLoading, user, navigate]);
  
  // Ensure we're passing the new fields to the database
  const onSubmit = async (values: JobFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to log in to post a project",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      setSubmitting(true);
      
      const { data, error } = await supabase
        .from("jobs")
        .insert({
          title: values.title,
          description: values.description,
          budget: Number(values.budget),
          category: values.category,
          deadline: values.deadline ? new Date(values.deadline).toISOString() : null,
          client_id: user.id,
          status: "open",
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Project posted successfully",
        description: "Your project has been posted and is now visible to creators",
      });
      
      navigate("/jobs");
    } catch (error: any) {
      toast({
        title: "Error posting project",
        description: error.message || "Failed to post project",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Post a New Project</CardTitle>
            <CardDescription>
              Share your project details to find the perfect creator for your needs
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title for your project" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear title helps creators understand your project at a glance
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your project in detail"
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include requirements, goals, and any specific details creators should know
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            placeholder="Enter your budget" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Set a realistic budget for your project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormDescription>
                          Choose the category that best fits your project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        When do you need this project completed?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/jobs")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-pink-500 hover:bg-pink-600"
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Post Project"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateJob;
