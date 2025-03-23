
import React from "react";
import { 
  MessageSquare, 
  Users, 
  Shield, 
  Zap, 
  DollarSign, 
  Star
} from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay }) => {
  return (
    <div className={`glass-card p-6 fade-in-hidden animate-fade-in ${delay}`}>
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "Seamless Communication",
      description: "Chat with text, share files, voice notes, and video calls - all on one platform.",
      icon: <MessageSquare size={24} />,
      delay: "animation-delay-100"
    },
    {
      title: "Smart Matching",
      description: "Our intelligent system connects the right clients with the perfect creators.",
      icon: <Users size={24} />,
      delay: "animation-delay-200"
    },
    {
      title: "Secure Payments",
      description: "Escrow system ensures both parties are protected during transactions.",
      icon: <Shield size={24} />,
      delay: "animation-delay-300"
    },
    {
      title: "Lightning Fast",
      description: "Streamlined workflow from job posting to final delivery with no delays.",
      icon: <Zap size={24} />,
      delay: "animation-delay-100"
    },
    {
      title: "Fair Pricing",
      description: "Transparent fee structure with no hidden costs for clients or creators.",
      icon: <DollarSign size={24} />,
      delay: "animation-delay-200"
    },
    {
      title: "Quality Assurance",
      description: "Rating system ensures high standards and accountability for all users.",
      icon: <Star size={24} />,
      delay: "animation-delay-300"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 fade-in-hidden animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Powerful Features for Seamless Collaboration
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our platform provides everything needed for successful client-creator relationships, from first contact to final delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
