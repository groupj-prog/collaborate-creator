
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Star, 
  Code, 
  FileText, 
  Image, 
  Calendar,
  Clock
} from "lucide-react";

// Mock data for a creator - will be replaced with real data from Supabase
type Creator = {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  projects: number;
  avatar?: string;
  bio?: string;
  hourlyRate?: number;
  portfolio?: PortfolioItem[];
  reviews?: Review[];
};

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags: string[];
};

type Review = {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
};

const CreatorProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock loading data for now - will be replaced with Supabase query
    setTimeout(() => {
      // Mock creator data based on ID
      const mockCreator: Creator = {
        id: id || "1",
        name: id === "2" ? "Sarah Miller" : (id === "3" ? "David Chen" : "Alex Johnson"),
        skills: ["Web Development", "UI/UX Design"],
        rating: 4.8,
        projects: 32,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id === "2" ? "Sarah" : (id === "3" ? "David" : "Alex")}`,
        bio: "Experienced web developer with 5+ years of experience in building responsive and accessible web applications. Specialized in React, TypeScript, and modern frontend frameworks.",
        hourlyRate: 45,
        portfolio: [
          {
            id: "p1",
            title: "E-commerce Dashboard",
            description: "A comprehensive dashboard for e-commerce store owners to track sales, inventory, and customer behavior.",
            image: "https://placehold.co/600x400",
            tags: ["React", "TypeScript", "Tailwind"]
          },
          {
            id: "p2",
            title: "Social Media Application",
            description: "A social platform for connecting professionals in the tech industry.",
            image: "https://placehold.co/600x400",
            tags: ["React Native", "Firebase", "Redux"]
          },
          {
            id: "p3",
            title: "Health Tracker App",
            description: "Mobile application for tracking fitness goals and nutrition.",
            image: "https://placehold.co/600x400",
            tags: ["React Native", "TypeScript", "GraphQL"]
          }
        ],
        reviews: [
          {
            id: "r1",
            clientName: "John Doe",
            clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            rating: 5,
            comment: "Excellent work! The project was delivered on time and exceeded my expectations.",
            date: "2023-08-15"
          },
          {
            id: "r2",
            clientName: "Jane Smith",
            clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            rating: 4.5,
            comment: "Great communication throughout the project. Would definitely hire again.",
            date: "2023-07-22"
          }
        ]
      };
      setCreator(mockCreator);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleContactCreator = () => {
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
            {loading ? (
              <div className="space-y-4">
                <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
                <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
              </div>
            ) : creator ? (
              <>
                {/* Creator Header */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex-shrink-0 mx-auto md:mx-0">
                        {creator.avatar && (
                          <img 
                            src={creator.avatar} 
                            alt={creator.name} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h1 className="text-3xl font-bold mb-2">{creator.name}</h1>
                            <div className="flex items-center mb-4">
                              <div className="flex items-center mr-4">
                                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                <span className="font-medium">{creator.rating}</span>
                                <span className="text-muted-foreground ml-1">({creator.reviews?.length || 0} reviews)</span>
                              </div>
                              <div className="text-muted-foreground">
                                {creator.projects} projects completed
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {creator.skills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Button 
                              onClick={handleContactCreator}
                              className="bg-pink-500 hover:bg-pink-600 w-full md:w-auto"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center text-lg font-medium">
                            <span>${creator.hourlyRate}</span>
                            <span className="text-muted-foreground ml-1">/hour</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Creator Tabs */}
                <Tabs defaultValue="about" className="mb-8">
                  <TabsList className="mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  {/* About Tab */}
                  <TabsContent value="about">
                    <Card>
                      <CardHeader>
                        <CardTitle>About {creator.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6">
                          {creator.bio}
                        </p>
                        
                        <h3 className="text-lg font-medium mb-4">Skills</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          {creator.skills.map((skill) => (
                            <div key={skill} className="flex items-center">
                              <Code className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <h3 className="text-lg font-medium mb-4">Availability</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>Full-time (40hrs/week)</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>Available now</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Portfolio Tab */}
                  <TabsContent value="portfolio">
                    <Card>
                      <CardHeader>
                        <CardTitle>Portfolio</CardTitle>
                        <CardDescription>
                          Recent projects completed by {creator.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {creator.portfolio?.map((item) => (
                            <Card key={item.id} className="overflow-hidden border">
                              <div className="aspect-video bg-muted">
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </div>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-xl">{item.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="pb-4">
                                <p className="text-muted-foreground mb-4">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Reviews Tab */}
                  <TabsContent value="reviews">
                    <Card>
                      <CardHeader>
                        <CardTitle>Client Reviews</CardTitle>
                        <CardDescription>
                          Feedback from previous clients
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {creator.reviews?.map((review) => (
                            <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0 mr-4">
                                  {review.clientAvatar && (
                                    <img 
                                      src={review.clientAvatar} 
                                      alt={review.clientName} 
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                    <h4 className="font-medium">{review.clientName}</h4>
                                    <div className="text-sm text-muted-foreground">
                                      {new Date(review.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </div>
                                  </div>
                                  <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${
                                          i < Math.floor(review.rating) 
                                            ? 'text-yellow-400' 
                                            : i < review.rating 
                                              ? 'text-yellow-300' 
                                              : 'text-gray-300'
                                        }`} 
                                        fill={i < review.rating ? "currentColor" : "none"}
                                      />
                                    ))}
                                    <span className="ml-2 font-medium">{review.rating}</span>
                                  </div>
                                  <p className="text-muted-foreground">{review.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">Creator Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find the creator you're looking for.
                </p>
                <Button onClick={() => navigate("/client-search")}>
                  Back to Search
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreatorProfileView;
