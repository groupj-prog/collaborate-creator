
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FutureEnhancements from "@/components/FutureEnhancements";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

const Index: React.FC = () => {
  const { theme } = useTheme();
  
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

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <FutureEnhancements />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
