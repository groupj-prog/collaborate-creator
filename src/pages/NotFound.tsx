
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-xs font-medium mb-4">
            404 Error
          </span>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-neutral-600 mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Link 
            to="/" 
            className="primary-button inline-block bg-pink-500 hover:bg-pink-600"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
