
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About ConnectHub</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building bridges between creative talent and innovative businesses
            </p>
          </div>
          
          <div className="space-y-16">
            <section>
              <div className="glass-card p-8 mb-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-video rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center"
                    >
                      <span className="text-6xl">🚀</span>
                    </motion.div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
                      <p className="text-foreground/80 mb-4">
                        We envision a world where creative talent flourishes without boundaries, where businesses find their perfect partners effortlessly, and where collaboration leads to remarkable innovation.
                      </p>
                      <p className="text-foreground/80">
                        ConnectHub aims to be the global standard for remote creative collaboration, empowering millions of creators and businesses to achieve extraordinary results together.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="glass-card p-8">
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
                    >
                      <span className="text-6xl">🌟</span>
                    </motion.div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                      <p className="text-foreground/80 mb-4">
                        Our mission is to create the most trusted, efficient, and inspiring platform for creative collaboration. We're committed to:
                      </p>
                      <ul className="space-y-2 text-foreground/80 list-disc pl-5">
                        <li>Empowering creators to showcase their talent and find meaningful work</li>
                        <li>Helping businesses discover exceptional talent to bring their visions to life</li>
                        <li>Building tools that make collaboration seamless and enjoyable</li>
                        <li>Fostering a supportive community where creativity thrives</li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="text-center">
                <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-6"
                  >
                    <div className="feature-icon mx-auto">🤝</div>
                    <h3 className="text-xl font-medium mb-2">Trust & Safety</h3>
                    <p className="text-foreground/80">We create a secure environment where both creators and clients feel protected and confident.</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="feature-icon mx-auto">💡</div>
                    <h3 className="text-xl font-medium mb-2">Innovation</h3>
                    <p className="text-foreground/80">We constantly evolve our platform to provide cutting-edge tools for creative collaboration.</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-6"
                  >
                    <div className="feature-icon mx-auto">🌍</div>
                    <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
                    <p className="text-foreground/80">We celebrate diversity and create opportunities for talent from all backgrounds and regions.</p>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
