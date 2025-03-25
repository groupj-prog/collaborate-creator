
import React from "react";
import { UserPlus, FileText, Users, MessageSquare, FileCheck, DollarSign, Star } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, delay }) => {
  return (
    <div className={`relative fade-in-hidden animate-fade-in ${delay}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
              Step {number}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-neutral-600 text-sm">{description}</p>
        </div>
      </div>
      
      {number < 7 && (
        <div className="absolute left-6 top-14 bottom-0 w-px bg-pink-100 h-12 md:h-16"></div>
      )}
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Registration & Profile Setup",
      description: "Sign up and create your profile - for clients or creators. Add your details, portfolio and preferences.",
      icon: <UserPlus size={24} />,
      delay: "animation-delay-100"
    },
    {
      number: 2,
      title: "Job Posting & Discovery",
      description: "Clients post projects with requirements and budget. Creators browse and filter projects that match their skills.",
      icon: <FileText size={24} />,
      delay: "animation-delay-200"
    },
    {
      number: 3,
      title: "Job Matching & Connection",
      description: "Clients search for creators using filters. Creators apply to projects that interest them.",
      icon: <Users size={24} />,
      delay: "animation-delay-300"
    },
    {
      number: 4,
      title: "Real-Time Collaboration",
      description: "Communicate through text, file sharing, voice notes, and video calls to discuss project requirements.",
      icon: <MessageSquare size={24} />,
      delay: "animation-delay-400"
    },
    {
      number: 5,
      title: "Work Submission & Review",
      description: "Creators submit deliverables through the platform. Clients review, request revisions, or approve the work.",
      icon: <FileCheck size={24} />,
      delay: "animation-delay-500"
    },
    {
      number: 6,
      title: "Secure Payment Processing",
      description: "Our escrow system holds payments until work is approved, protecting both clients and creators.",
      icon: <DollarSign size={24} />,
      delay: "animation-delay-600"
    },
    {
      number: 7,
      title: "Ratings & Portfolio Updates",
      description: "Leave feedback and ratings after project completion. Completed work enhances the creator's portfolio.",
      icon: <Star size={24} />,
      delay: "animation-delay-700"
    }
  ];

  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 fade-in-hidden animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            How TalentBazaar Works
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our simple yet powerful process connects clients with talented creators in just a few steps.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
          {steps.map((step) => (
            <Step 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={step.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
