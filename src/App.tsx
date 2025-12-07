import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Identify from "./pages/Identify";
import Results from "./pages/Results";
import MyPlants from "./pages/MyPlants";
import PlantDetail from "./pages/PlantDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {showSplash ? (
              <SplashScreen onComplete={() => setShowSplash(false)} />
            ) : (
              <Layout>
                <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/results" element={<Results />} />
          <Route path="/my-plants" element={<MyPlants />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            )}
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
