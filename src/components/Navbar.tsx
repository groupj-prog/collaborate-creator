
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold">Connect</span>
            <span className="text-2xl font-semibold text-pink-500">Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-pink-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm font-medium hover:text-pink-500 transition-colors duration-200"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium hover:text-pink-500 transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-pink-500 transition-colors duration-200"
          >
            About
          </Link>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-200 hover:bg-pink-50 border-[1.5px]"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-200"
              asChild
            >
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-neutral-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass p-5 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-pink-500 transition-colors duration-200 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-medium hover:text-pink-500 transition-colors duration-200 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-pink-500 transition-colors duration-200 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-pink-500 transition-colors duration-200 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-3 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full transition-all duration-200 hover:bg-pink-50 w-full"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-200 w-full"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
