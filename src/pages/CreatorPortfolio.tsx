
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorSidebar from "@/components/CreatorSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Image, X } from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
};

const CreatorPortfolio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      image: null as File | null,
    },
  });

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
    // In a real app, you would fetch portfolio items here
  }, [user, navigate]);

  const onSubmit = async (values: any) => {
    // In a real application, this would save the portfolio item to the database
    setLoading(true);
    try {
      // Simulate adding a portfolio item
      const newItem = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        image_url: '/placeholder.svg', // Placeholder image
        tags: values.tags.split(',').map((tag: string) => tag.trim()),
      };

      setPortfolioItems([...portfolioItems, newItem]);
      setIsAddingNew(false);
      form.reset();
      
      toast({
        title: "Portfolio item added",
        description: "Your portfolio item has been successfully added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <CreatorSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
                <p className="text-muted-foreground">
                  Showcase your best work to attract potential clients
                </p>
              </div>
              <Button 
                onClick={() => setIsAddingNew(true)}
                className="bg-pink-500 hover:bg-pink-600 flex items-center gap-2"
              >
                <Plus size={16} /> Add Portfolio Item
              </Button>
            </div>

            {isAddingNew && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New Portfolio Item</CardTitle>
                  <CardDescription>Share your work and skills with potential clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., 'Brand Identity Design'" {...field} />
                            </FormControl>
                            <FormDescription>
                              A clear title for your portfolio work
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
                                placeholder="Describe your work, process, and outcomes..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain your contribution, challenges, and solutions
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., design, branding, logo (comma separated)" {...field} />
                            </FormControl>
                            <FormDescription>
                              Add tags to make your work more discoverable
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Portfolio Image</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Button 
                                  type="button"
                                  variant="outline"
                                  className="h-40 w-40 border-dashed flex flex-col items-center justify-center gap-2"
                                  onClick={() => document.getElementById('portfolio-image-upload')?.click()}
                                >
                                  <Image size={24} />
                                  <span className="text-sm">Upload Image</span>
                                  <input
                                    id="portfolio-image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      onChange(file);
                                    }}
                                    {...field}
                                  />
                                </Button>
                                {value && (
                                  <div className="relative h-40 w-40">
                                    <img 
                                      src={URL.createObjectURL(value)} 
                                      alt="Portfolio preview" 
                                      className="h-full w-full object-cover rounded-md"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute -top-2 -right-2 h-6 w-6"
                                      onClick={() => onChange(null)}
                                    >
                                      <X size={12} />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload a high-quality image showcasing your work
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddingNew(false);
                            form.reset();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-pink-500 hover:bg-pink-600"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Portfolio Item"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {portfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-muted text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center text-center p-12">
                  <div className="bg-muted/20 p-6 rounded-full mb-4">
                    <Image size={32} className="text-pink-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Portfolio Items Yet</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Add your best work to showcase your skills and attract potential clients.
                  </p>
                  <Button 
                    onClick={() => setIsAddingNew(true)}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    Add Your First Portfolio Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreatorPortfolio;
