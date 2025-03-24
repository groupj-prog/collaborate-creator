
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const HeroSection: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <section className="pt-32 pb-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-transparent opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-1/2 fade-in-hidden animate-fade-in">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium mb-4">
                Connect with top digital talent
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-neutral-800">
              Where Great Ideas Meet 
              <span className="text-gradient"> Creative Talent</span>
            </h1>
            <p className="text-lg text-neutral-800 mb-8 max-w-xl">
              The seamless platform connecting businesses with top digital creators for exceptional projects. Communicate, collaborate, and create without limits.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="primary-button bg-pink-500 hover:bg-pink-600" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button className="outline-button" variant="outline" asChild>
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
            )}
            
            {!user && (
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-medium">JD</div>
                  <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-xs font-medium">KP</div>
                  <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-medium">MR</div>
                  <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-xs font-medium">SL</div>
                </div>
                <p className="text-sm text-neutral-800">
                  <span className="font-medium">2,500+</span> professionals already joined
                </p>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 fade-in-hidden animate-fade-in animation-delay-300">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-100 rounded-full filter blur-3xl opacity-50"></div>
              
              <div className="gradient-border bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Logo Design Project</h3>
                    <p className="text-sm text-neutral-500">Posted by Acme Inc.</p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                    Open
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-4 pb-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-neutral-500">Budget</span>
                    <span className="text-sm font-medium">$500 - $1,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-neutral-500">Timeline</span>
                    <span className="text-sm font-medium">2 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Applications</span>
                    <span className="text-sm font-medium">12 creators</span>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="primary-button bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 text-sm w-full">
                    Apply Now
                  </button>
                </div>
              </div>
              
              <div className="absolute top-1/4 -right-12 glass-card p-4 rounded-lg shadow-lg rotate-6 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium">JM</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Jessica Miller</p>
                    <p className="text-xs text-neutral-500">Just applied • 2m ago</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -left-12 glass-card p-4 rounded-lg shadow-lg -rotate-6 animate-pulse animation-delay-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium">TS</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Thomas Smith</p>
                    <p className="text-xs text-neutral-500">New message • 5m ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
