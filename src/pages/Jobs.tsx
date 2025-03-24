
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { 
  Search, Filter, Calendar, DollarSign, Tag
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

// Extend the Jobs type to include the new fields we added in SQL
type Job = Tables<"jobs"> & {
  category?: string | null;
  deadline?: string | null;
};

const Jobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [budgetFilter, setBudgetFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Categories for filtering
  const categories = ["Web Development", "Mobile App", "Design", "Marketing", "Writing", "Other"];

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, budgetFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Start with a basic query and build up parts separately to avoid deep type instantiation
      const baseQuery = supabase.from("jobs");
      
      // Create query parameters object
      const queryParams: Record<string, any> = {};
      
      // Add filters to params if they exist
      if (selectedCategory) {
        queryParams.category = selectedCategory;
      }
      
      // Execute the query
      let { data, error } = await baseQuery
        .select()
        .match(queryParams) // Use match for exact equality conditions
        .order('created_at', { ascending: false });
      
      // Handle budget filtering separately after initial query
      // to avoid complex query chains that cause TypeScript issues
      if (data && budgetFilter) {
        switch(budgetFilter) {
          case "under100":
            data = data.filter(job => job.budget !== null && job.budget < 100);
            break;
          case "100to500":
            data = data.filter(job => job.budget !== null && job.budget >= 100 && job.budget < 500);
            break;
          case "500to1000":
            data = data.filter(job => job.budget !== null && job.budget >= 500 && job.budget < 1000);
            break;
          case "over1000":
            data = data.filter(job => job.budget !== null && job.budget >= 1000);
            break;
        }
      }
      
      if (error) {
        throw error;
      }
      
      // Cast the data to our extended Job type
      setJobs(data as Job[] || []);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.message || "Failed to load jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatBudget = (budget: number | null) => {
    if (budget === null) return "Budget not specified";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discover Projects</h1>
          {user && (
            <Button 
              onClick={() => navigate("/create-job")}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Post a Project
            </Button>
          )}
        </div>
        
        {/* Search and filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" /> 
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium mb-2 block">Category</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategory === category}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategory(category);
                              } else {
                                setSelectedCategory(null);
                              }
                            }}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-2 block">Budget</Label>
                    <RadioGroup 
                      value={budgetFilter || ""}
                      onValueChange={setBudgetFilter}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="under100" id="under100" />
                          <Label htmlFor="under100">Under $100</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100to500" id="100to500" />
                          <Label htmlFor="100to500">$100 - $500</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="500to1000" id="500to1000" />
                          <Label htmlFor="500to1000">$500 - $1,000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="over1000" id="over1000" />
                          <Label htmlFor="over1000">Over $1,000</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null);
                      setBudgetFilter(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Jobs list */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="bg-muted/10 h-24"></CardHeader>
                <CardContent className="pt-6">
                  <div className="h-4 bg-muted/20 rounded mb-4"></div>
                  <div className="h-4 bg-muted/20 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted/20 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden border border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    {job.category || "Uncategorized"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {job.description || "No description provided."}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {formatBudget(job.budget)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {job.deadline ? formatDate(job.deadline) : "No deadline"}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/5 pt-2">
                  <Button 
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory || budgetFilter 
                ? "Try adjusting your search or filters" 
                : "No projects have been posted yet"}
            </p>
            {user && (
              <Button 
                onClick={() => navigate("/create-job")}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Post a Project
              </Button>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
