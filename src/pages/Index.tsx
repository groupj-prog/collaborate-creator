
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FutureEnhancements from "@/components/FutureEnhancements";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import CarrierPhotoSection from "@/components/CarrierPhotoSection";
import ChatButton from "@/components/ChatButton";

const Index: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    // Initialize animation visibility detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("fade-in-hidden");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-hidden").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".fade-in-hidden").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    // Fetch user type if user is logged in
    const fetchUserType = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setUserType(data.user_type);
        }
      } else {
        setUserType(null);
      }
    };

    fetchUserType();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Navbar />
      <main>
        {user && userType ? (
          <CarrierPhotoSection userType={userType} />
        ) : (
          <>
            <HeroSection />
            <FeatureSection />
            <HowItWorksSection />
            <FutureEnhancements />
            <CtaSection />
          </>
        )}
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default Index;
