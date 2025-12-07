import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Leaf, TrendingUp } from "lucide-react";
import heroPlant from "@/assets/hero-plant.jpg";
import logoNew from "@/assets/logo-new.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 pb-4"
      >
        <div className="flex items-center gap-3">
          <img
            src={logoNew}
            alt="PlantiFy Logo"
            className="h-16 w-16 object-contain rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              PlantiFy
            </h1>
            <p className="text-sm text-muted-foreground">Nature's Medicine</p>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 pb-6"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-leaf">
          <img
            src={heroPlant}
            alt="Medicinal Plant"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Discover Medicinal Plants
            </h2>
            <p className="text-white/90 text-sm">
              Identify and learn about nature's healing properties
            </p>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-6 space-y-4"
      >
        <Button
          onClick={() => navigate("/identify")}
          className="w-full h-16 text-lg font-semibold bg-botanical-gradient hover:opacity-90 transition-opacity shadow-leaf"
        >
          <Camera className="mr-3 h-6 w-6" />
          Identify Plant
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-plants")}
            className="bg-card rounded-2xl p-6 shadow-card-soft cursor-pointer hover:shadow-leaf transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-3">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">My Plants</h3>
            <p className="text-xs text-muted-foreground">
              Browse 55 medicinal plants
            </p>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-card rounded-2xl p-6 shadow-card-soft cursor-pointer hover:shadow-leaf transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Learn More</h3>
            <p className="text-xs text-muted-foreground">
              Health benefits & uses
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 py-8"
      >
        <div className="bg-accent/50 rounded-2xl p-6 border border-border/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Quick Facts
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">55</div>
              <div className="text-xs text-muted-foreground">Plants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground">Natural</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-xs text-muted-foreground">Powered</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
