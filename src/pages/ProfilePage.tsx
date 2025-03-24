
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSidebar from "@/components/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Edit, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string;
  username: string;
  email: string;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    username: "",
    email: "",
    bio: null,
    location: null,
    avatar_url: null,
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Get user email from auth
        const { data: userData } = await supabase.auth.getUser();

        setProfileData({
          full_name: profileData?.full_name || "",
          username: profileData?.username || "",
          email: userData.user?.email || "",
          bio: profileData?.bio || "",
          location: profileData?.location || "",
          avatar_url: profileData?.avatar_url || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error loading profile",
          description: "We couldn't load your profile information.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profileData.full_name,
          username: profileData.username,
          bio: profileData.bio,
          location: profileData.location,
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "We couldn't update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 ml-64 pt-24 pb-16 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">My Profile</h1>
              {!editing ? (
                <Button onClick={() => setEditing(true)}>
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button onClick={handleSaveProfile}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-center">
                  <p>Loading profile...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="mb-4">
                      <Avatar className="w-32 h-32 border-4 border-background">
                        {profileData.avatar_url ? (
                          <AvatarImage src={profileData.avatar_url} alt={profileData.full_name} />
                        ) : (
                          <AvatarFallback className="text-2xl">
                            {getInitials(profileData.full_name || "User")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <h2 className="text-xl font-semibold mb-1">{profileData.full_name}</h2>
                    <p className="text-muted-foreground mb-4">@{profileData.username}</p>
                    
                    <div className="w-full space-y-3 mt-6">
                      <div className="flex items-center">
                        <User className="text-muted-foreground mr-3" size={18} />
                        <span>{profileData.email}</span>
                      </div>
                      {profileData.location && (
                        <div className="flex items-center">
                          <Settings className="text-muted-foreground mr-3" size={18} />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="full_name" className="text-sm font-medium mb-1 block">
                        Full Name
                      </label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="text-sm font-medium mb-1 block">
                        Username
                      </label>
                      <Input
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-1 block">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        value={profileData.email}
                        disabled={true} // Email cannot be changed here
                        className="bg-muted"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="text-sm font-medium mb-1 block">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio || ""}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="text-sm font-medium mb-1 block">
                        Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location || ""}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
