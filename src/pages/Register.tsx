
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserTypeButton: React.FC<{
  id: string;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}> = ({ id, title, description, icon, selected, onClick }) => {
  return (
    <div
      className={`p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 cursor-pointer hover:shadow-md ${
        selected ? "ring-2 ring-pink-500 bg-pink-50 dark:bg-pink-950/20" : "bg-white dark:bg-neutral-900"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-500 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleContinue = () => {
    if (!userType) return;
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Create the profile with explicit RLS bypass
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: data.user?.id,
            user_type: userType,
            username: email.split('@')[0],
            avatar_url: null,
            full_name: null
          }
        ]);
      
      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Continue despite profile error, we'll handle it separately
      }
      
      // Try to sign in immediately
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Auto sign-in error:", signInError);
        
        if (signInError.message.includes("Email not confirmed")) {
          toast({
            title: "Registration successful",
            description: "Your account has been created. Please check your email to verify your account before logging in.",
          });
          navigate("/login");
        } else {
          toast({
            title: "Registration failed",
            description: signInError.message || "An unexpected error occurred during sign-in",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Registration successful",
          description: "You have been registered and logged in successfully.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-pink-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Link>
          
          <div className="glass-card p-8">
            <div className="text-center mb-10 fade-in-hidden animate-fade-in">
              <h1 className="text-3xl font-semibold mb-3">Join ConnectHub</h1>
              {step === 1 ? (
                <p className="text-neutral-600 dark:text-neutral-400">
                  First, let us know how you'd like to use ConnectHub
                </p>
              ) : (
                <p className="text-neutral-600 dark:text-neutral-400">
                  Create your account as a {userType === "client" ? "Client" : "Creator"}
                </p>
              )}
            </div>
            
            {step === 1 ? (
              <div className="space-y-4 fade-in-hidden animate-fade-in animation-delay-200">
                <UserTypeButton 
                  id="client"
                  title="I'm a Client"
                  description="I need to hire talented creators for my projects"
                  icon="🏢"
                  selected={userType === "client"}
                  onClick={() => setUserType("client")}
                />
                
                <UserTypeButton 
                  id="creator"
                  title="I'm a Creator"
                  description="I want to showcase my skills and find great projects"
                  icon="🎨"
                  selected={userType === "creator"}
                  onClick={() => setUserType("creator")}
                />
                
                <div className="mt-10 fade-in-hidden animate-fade-in animation-delay-300">
                  <Button 
                    className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                    disabled={!userType}
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 fade-in-hidden animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                
                <div className="mt-8 flex flex-col space-y-4">
                  <Button 
                    className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="text-pink-500 hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
