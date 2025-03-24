
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setSubmitted(true);
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
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
            to="/login"
            className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-pink-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </Link>
          
          <div className="glass-card p-8">
            {!submitted ? (
              <>
                <div className="text-center mb-8 fade-in-hidden animate-fade-in">
                  <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Enter your email and we'll send you a link to reset your password
                  </p>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-4 fade-in-hidden animate-fade-in animation-delay-200">
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
                
                  <div className="mt-8">
                    <Button 
                      className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    
                    <div className="text-center mt-6">
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Remembered your password?{" "}
                        <Link to="/login" className="text-pink-500 hover:underline">
                          Back to login
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8 fade-in-hidden animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Check your email</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <Button 
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
