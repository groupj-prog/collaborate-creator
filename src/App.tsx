
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobDetail from "./pages/JobDetail";
import CreatorDashboard from "./pages/CreatorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import CreatorPortfolio from "./pages/CreatorPortfolio";
import CreatorProjects from "./pages/CreatorProjects";
import CreatorMessages from "./pages/CreatorMessages";
import ClientSearch from "./pages/ClientSearch";
import ClientMessages from "./pages/ClientMessages";
import ClientAbout from "./pages/ClientAbout";
import CreatorProfileView from "./pages/CreatorProfileView";

// Create a client instance outside the component
const queryClient = new QueryClient();

// Define as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/job/:id" element={<JobDetail />} />
                
                {/* Creator routes */}
                <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                <Route path="/creator-portfolio" element={<CreatorPortfolio />} />
                <Route path="/creator-projects" element={<CreatorProjects />} />
                <Route path="/creator-messages" element={<CreatorMessages />} />
                
                {/* Client routes */}
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/client-search" element={<ClientSearch />} />
                <Route path="/client-messages" element={<ClientMessages />} />
                <Route path="/client-about" element={<ClientAbout />} />
                <Route path="/creator-profile/:id" element={<CreatorProfileView />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
