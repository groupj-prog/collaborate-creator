
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CarrierPhotoSectionProps {
  userType: string;
}

const CarrierPhotoSection: React.FC<CarrierPhotoSectionProps> = ({ userType }) => {
  const { user } = useAuth();
  
  const isCreator = userType === 'creator';
  
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to your {isCreator ? "Creator" : "Client"} Portal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {isCreator 
              ? "Showcase your talent, connect with clients, and manage your creative projects in one place."
              : "Find talented creators, manage your projects, and bring your ideas to life with our platform."
            }
          </p>
          
          <Button 
            className="bg-[#F2CFD7] hover:bg-[#F2CFD7]/90 text-[#3D6E65] font-medium"
            asChild
          >
            <Link to={isCreator ? "/creator-dashboard" : "/client-dashboard"}>
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-hidden animate-fade-in">
          {isCreator ? (
            // Creator carrier photos
            <>
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/creator-portfolio.jpg" 
                  alt="Creator Portfolio"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Showcase Your Portfolio</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Display your best work to attract potential clients.
                  </p>
                  <Link 
                    to="/creator-portfolio" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    View Portfolio <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/creator-projects.jpg" 
                  alt="Creator Projects"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Manage Your Projects</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track progress and deliverables for all your client work.
                  </p>
                  <Link 
                    to="/creator-projects" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    View Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/creator-messages.jpg" 
                  alt="Creator Messages"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Connect with Clients</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Communicate directly with clients about project details.
                  </p>
                  <Link 
                    to="/creator-messages" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    View Messages <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Client carrier photos
            <>
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/client-search.jpg" 
                  alt="Find Creators"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Find Talented Creators</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our network of skilled professionals for your projects.
                  </p>
                  <Link 
                    to="/client-search" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    Search Creators <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/create-job.jpg" 
                  alt="Post Projects"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Post Your Projects</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create detailed project listings to attract the right talent.
                  </p>
                  <Link 
                    to="/create-job" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    Create Job <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img 
                  src="/client-messages.jpg" 
                  alt="Client Messages"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
                  }}
                />
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-lg font-medium mb-2">Communicate with Creators</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Message creators directly about your project requirements.
                  </p>
                  <Link 
                    to="/client-messages" 
                    className="text-[#3D6E65] font-medium flex items-center text-sm"
                  >
                    View Messages <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarrierPhotoSection;
