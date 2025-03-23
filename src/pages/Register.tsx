
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      className={`p-6 rounded-xl border border-neutral-200 transition-all duration-300 cursor-pointer hover:shadow-md ${
        selected ? "ring-2 ring-pink-500 bg-pink-50" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-neutral-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-pink-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Link>
          
          <div className="glass-card p-8">
            <div className="text-center mb-10 fade-in-hidden animate-fade-in">
              <h1 className="text-3xl font-semibold mb-3">Join ConnectHub</h1>
              <p className="text-neutral-600">
                First, let us know how you'd like to use ConnectHub
              </p>
            </div>
            
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
            </div>
            
            <div className="mt-10 fade-in-hidden animate-fade-in animation-delay-300">
              <Button 
                className="primary-button bg-pink-500 hover:bg-pink-600 w-full"
                disabled={!userType}
                onClick={() => {
                  // This would navigate to the next registration step in a full implementation
                  console.log(`Registering as ${userType}`);
                }}
              >
                Continue
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-neutral-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-pink-500 hover:underline">
                    Log in
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

export default Register;
