
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-md">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-pink-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Link>
          
          <div className="glass-card p-8">
            <div className="text-center mb-8 fade-in-hidden animate-fade-in">
              <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
              <p className="text-neutral-600 text-sm">
                Log in to continue to ConnectHub
              </p>
            </div>
            
            <div className="space-y-4 fade-in-hidden animate-fade-in animation-delay-200">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
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
                  placeholder="Enter your password"
                  className="rounded-lg border-neutral-200 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            </div>
            
            <div className="mt-8 fade-in-hidden animate-fade-in animation-delay-300">
              <Button 
                className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                onClick={() => {
                  // Login logic would go here
                  console.log("Login attempted");
                }}
              >
                Log In
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-neutral-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-pink-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
