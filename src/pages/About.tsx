import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import logoLeaf from "@/assets/logo-leaf.png";

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced machine learning for accurate plant identification",
    },
    {
      icon: Leaf,
      title: "55+ Plants",
      description: "Comprehensive database of medicinal plants from around the world",
    },
    {
      icon: Heart,
      title: "Traditional Wisdom",
      description: "Learn about time-tested natural remedies and their benefits",
    },
    {
      icon: Shield,
      title: "Reliable Info",
      description: "Curated information from trusted botanical sources",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 pt-6"
      >
        <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-botanical-gradient flex items-center justify-center shadow-leaf">
          <img src={logoLeaf} alt="PlantiFy" className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold mb-2">PlantiFy</h1>
        <p className="text-muted-foreground">Version 1.0.0</p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-card-soft mb-6 border border-border/50"
      >
        <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          PlantiFy is dedicated to preserving and sharing traditional botanical knowledge.
          We combine cutting-edge AI technology with centuries of wisdom to help people
          identify and learn about medicinal plants around the world.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-6"
      >
        <h2 className="text-xl font-semibold">Key Features</h2>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-accent/30 rounded-2xl p-5 border border-border/50"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-botanical-gradient flex items-center justify-center flex-shrink-0 shadow-leaf">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20"
      >
        <h2 className="font-semibold text-lg mb-2 text-destructive">Medical Disclaimer</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The information provided by PlantiFy is for educational purposes only and should
          not be used as a substitute for professional medical advice, diagnosis, or treatment.
          Always consult with a qualified healthcare provider before using any plant for
          medicinal purposes.
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12 py-6 text-sm text-muted-foreground"
      >
        <p>Made with ❤️ for nature lovers</p>
        <p className="mt-2">© 2024 PlantiFy. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default About;
