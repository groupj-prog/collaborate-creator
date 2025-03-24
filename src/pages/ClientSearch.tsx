
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, Star, ChevronDown } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Mock data for creators - will be replaced with real data from Supabase
type Creator = {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  projects: number;
  avatar?: string;
};

const ClientSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number[]>([0]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Skills for filtering
  const skills = [
    "Web Development", 
    "Mobile App Development", 
    "UI/UX Design", 
    "Graphic Design", 
    "Content Writing", 
    "Marketing",
    "Video Editing",
    "Photography"
  ];

  // Mock data - will be replaced with actual DB query
  const mockCreators: Creator[] = [
    {
      id: "1",
      name: "Alex Johnson",
      skills: ["Web Development", "UI/UX Design"],
      rating: 4.8,
      projects: 32,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      id: "2",
      name: "Sarah Miller",
      skills: ["Graphic Design", "UI/UX Design"],
      rating: 4.5,
      projects: 27,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: "3",
      name: "David Chen",
      skills: ["Mobile App Development", "Web Development"],
      rating: 4.9,
      projects: 41,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      skills: ["Content Writing", "Marketing"],
      rating: 4.2,
      projects: 19,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
  ];

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
        .maybeSingle();
      
      if (data?.user_type === 'creator') {
        // Redirect creators
        navigate("/creator-dashboard");
      }
    };

    checkUserRole();
    
    // Load creators - using mock data for now
    // Will be replaced with actual Supabase query
    setTimeout(() => {
      setCreators(mockCreators);
      setLoading(false);
    }, 500);
  }, [user, navigate]);

  // Filter creators based on search term, selected skill, and rating
  const filteredCreators = creators.filter(creator => 
    // Filter by search term (name)
    (creator.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    // Filter by selected skill
    (!selectedSkill || creator.skills.includes(selectedSkill)) &&
    // Filter by minimum rating
    creator.rating >= ratingFilter[0]
  );

  const handleContactCreator = (creatorId: string) => {
    // Will implement actual messaging functionality later
    toast({
      title: "Contact initiated",
      description: "You'll be able to message this creator soon!",
    });
    navigate("/client-messages");
  };

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
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    className="pl-10 py-6 text-lg" 
                    placeholder="Search for creators by name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" /> 
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Creators</SheetTitle>
                      <SheetDescription>
                        Filter by skills and rating
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-4">
                      <div>
                        <Label className="text-base font-medium mb-2 block">Skills</Label>
                        <Select
                          value={selectedSkill || ""}
                          onValueChange={(value) => setSelectedSkill(value === "" ? null : value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Skill</SelectItem>
                            {skills.map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium mb-2 block">
                          Minimum Rating: {ratingFilter[0]}
                        </Label>
                        <Slider
                          defaultValue={[0]}
                          max={5}
                          step={0.1}
                          value={ratingFilter}
                          onValueChange={setRatingFilter}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="flex justify-end mt-4 gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSkill(null);
                            setRatingFilter([0]);
                          }}
                        >
                          Clear Filters
                        </Button>
                        <SheetClose asChild>
                          <Button className="bg-pink-500 hover:bg-pink-600">
                            Apply Filters
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-muted"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredCreators.length > 0 ? (
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Available Creators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Creator</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Projects</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCreators.map((creator) => (
                          <TableRow key={creator.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                                  {creator.avatar && (
                                    <img 
                                      src={creator.avatar} 
                                      alt={creator.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                </div>
                                <span>{creator.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {creator.skills.map((skill) => (
                                  <span 
                                    key={skill} 
                                    className="px-2 py-1 bg-muted text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>{creator.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>{creator.projects}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                className="bg-pink-500 hover:bg-pink-600 text-white"
                                onClick={() => handleContactCreator(creator.id)}
                              >
                                Contact
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No creators found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Web Development", "Mobile App", "Design", "Marketing", "Writing", "Other"].map((category) => (
                  <Button 
                    key={category}
                    variant="outline" 
                    className="h-auto py-4 justify-start gap-2"
                    onClick={() => {
                      const matchingSkill = skills.find(s => s.includes(category));
                      if (matchingSkill) {
                        setSelectedSkill(matchingSkill);
                      }
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientSearch;
