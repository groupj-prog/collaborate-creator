
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import CtaSection from "@/components/CtaSection";

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 px-6 bg-neutral-50">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-hidden animate-fade-in">
              How TalentBazaar Works
            </h1>
            <p className="text-lg text-neutral-600 mb-8 fade-in-hidden animate-fade-in animation-delay-200">
              Our platform connects clients and creators through a streamlined process designed for efficiency, quality, and trust.
            </p>
          </div>
        </section>
        
        <HowItWorksSection />
        
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="fade-in-hidden animate-fade-in">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="w-full h-64 bg-neutral-100 rounded-xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="w-3/4 h-6 bg-neutral-100 rounded-full"></div>
                    <div className="w-1/2 h-4 bg-neutral-100 rounded-full"></div>
                    <div className="w-full h-4 bg-neutral-100 rounded-full"></div>
                    <div className="w-2/3 h-4 bg-neutral-100 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="fade-in-hidden animate-fade-in animation-delay-300">
                <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium mb-4">
                  For Clients
                </span>
                <h2 className="text-3xl font-semibold mb-6">
                  Find Top Creative Talent for Your Projects
                </h2>
                <p className="text-neutral-600 mb-6">
                  Post your project, browse qualified candidates, and connect with the perfect creator for your needs. Our platform streamlines the entire process from first contact to final delivery.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Post detailed projects with specific requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Browse creators by skill, experience, and rating
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Secure payment system protects your investment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 bg-neutral-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 fade-in-hidden animate-fade-in">
                <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium mb-4">
                  For Creators
                </span>
                <h2 className="text-3xl font-semibold mb-6">
                  Showcase Your Skills and Find Great Projects
                </h2>
                <p className="text-neutral-600 mb-6">
                  Build your professional portfolio, apply to relevant projects, and grow your client base. Our platform helps you focus on what matters most - creating exceptional work.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Create a stunning portfolio to showcase your talents
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Filter projects by category, budget, and deadline
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-neutral-700">
                      Build your reputation through client reviews and ratings
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="order-1 md:order-2 fade-in-hidden animate-fade-in animation-delay-300">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="w-full h-64 bg-neutral-100 rounded-xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="w-3/4 h-6 bg-neutral-100 rounded-full"></div>
                    <div className="w-1/2 h-4 bg-neutral-100 rounded-full"></div>
                    <div className="w-full h-4 bg-neutral-100 rounded-full"></div>
                    <div className="w-2/3 h-4 bg-neutral-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
