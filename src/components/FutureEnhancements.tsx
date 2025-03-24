
import React from "react";
import { ArrowRight, Sparkles, Users, Smartphone } from "lucide-react";

const FutureEnhancements: React.FC = () => {
  return (
    <section className="py-16 px-6 relative bg-gradient-to-b from-white to-pink-50/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in-hidden animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium mb-4">
            Coming Soon
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-neutral-800">
            Future Enhancements
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We're constantly evolving to provide you with the best experience possible. Here's what's on our roadmap.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 hover-lift fade-in-hidden animate-fade-in animation-delay-100">
            <div className="mb-4 text-pink-500">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-800">AI Matching</h3>
            <p className="text-neutral-600 mb-4">
              Smart algorithms to match clients with the perfect creators based on project requirements and expertise.
            </p>
            <div className="flex items-center text-pink-500 font-medium">
              <span>Learn more</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>

          <div className="glass-card p-6 hover-lift fade-in-hidden animate-fade-in animation-delay-200">
            <div className="mb-4 text-pink-500">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-800">Events & Networking</h3>
            <p className="text-neutral-600 mb-4">
              Virtual and in-person events to connect with other professionals, share insights, and expand your network.
            </p>
            <div className="flex items-center text-pink-500 font-medium">
              <span>Learn more</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>

          <div className="glass-card p-6 hover-lift fade-in-hidden animate-fade-in animation-delay-300">
            <div className="mb-4 text-pink-500">
              <Smartphone size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-800">Mobile App</h3>
            <p className="text-neutral-600 mb-4">
              Stay connected on the go with our upcoming mobile application for iOS and Android devices.
            </p>
            <div className="flex items-center text-pink-500 font-medium">
              <span>Learn more</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureEnhancements;
