import { useEffect } from "react";
import { motion } from "framer-motion";
import logoNew from "@/assets/logo-new.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-botanical-gradient"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <motion.img
          src={logoNew}
          alt="PlantiFy Logo"
          className="h-32 w-32 object-contain rounded-full"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-900 bg-clip-text text-transparent tracking-wide"
        >
          PlantiFy
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-primary-foreground/90 text-lg"
        >
          Discover Nature's Remedies
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-1 h-1 rounded-full bg-primary-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-primary-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
