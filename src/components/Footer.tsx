
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">Connect</span>
              <span className="text-xl font-semibold text-pink-500">Hub</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-600 max-w-xs">
              ConnectHub brings together clients and digital creators for seamless collaboration and exceptional results.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-project" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link to="/browse-creators" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Browse Creators
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/client-resources" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">For Creators</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-work" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/create-portfolio" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Create Portfolio
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/creator-resources" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-neutral-600 hover:text-pink-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} ConnectHub. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-sm text-neutral-500 hover:text-pink-500 transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-neutral-500 hover:text-pink-500 transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-neutral-500 hover:text-pink-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
