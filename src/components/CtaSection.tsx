
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const CtaSection: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50 opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center">
          <div className="mb-6 fade-in-hidden animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
              Ready to get started?
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 fade-in-hidden animate-fade-in animation-delay-100 text-neutral-800">
            Join the Community of Digital Creators and Clients
          </h2>
          
          <p className="text-neutral-800 mb-8 max-w-2xl mx-auto fade-in-hidden animate-fade-in animation-delay-200">
            Whether you're looking to hire talent or showcase your skills, TalentBazaar makes the process seamless, secure, and successful.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-hidden animate-fade-in animation-delay-300">
              <Button className="primary-button bg-pink-500 hover:bg-pink-600" size="lg" asChild>
                <Link to="/register">Create Your Account</Link>
              </Button>
              <Button className="outline-button" variant="outline" size="lg" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
