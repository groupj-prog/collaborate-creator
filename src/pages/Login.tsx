
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
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
        <div className="container mx-auto max-w-md">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-pink-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Link>
          
          <div className="glass-card p-8">
            <div className="text-center mb-8 fade-in-hidden animate-fade-in">
              <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Log in to continue to TalentBazaar
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4 fade-in-hidden animate-fade-in animation-delay-200">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-lg border-neutral-200 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-pink-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="rounded-lg border-neutral-200 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            
              <div className="mt-8">
                <Button 
                  className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>
                
                <div className="text-center mt-6">
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-pink-500 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
