import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2, Leaf, Sparkles } from "lucide-react";
import { getPlantById } from "@/utils/plantDatabase";
import type { PlantFromDB } from "@/utils/plantDatabase";
import { toast } from "sonner";

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<PlantFromDB | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlant = async () => {
      setLoading(true);
      const data = await getPlantById(Number(id));
      setPlant(data);
      setLoading(false);
    };
    loadPlant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading plant details...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Plant not found</p>
          <Button onClick={() => navigate("/my-plants")} className="mt-4">
            Back to Plants
          </Button>
        </div>
      </div>
    );
  }

  const handleFavorite = () => {
    toast.success("Added to favorites!");
  };

  const handleShare = () => {
    toast.info("Share feature coming soon!");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border p-4"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className="rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Plant Hero */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-6"
      >
        <div className="relative h-64 rounded-3xl overflow-hidden bg-botanical-gradient shadow-leaf mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="h-32 w-32 text-primary-foreground/30" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {plant.name}
            </h1>
            {plant.scientific_name && (
              <p className="text-sm text-muted-foreground italic mb-2">
                {plant.scientific_name}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Medicinal Plant</span>
            </div>
          </div>

          {/* Description */}
          {plant.description && (
            <div className="bg-card rounded-2xl p-6 shadow-card-soft border border-border/50">
              <h2 className="font-semibold text-lg mb-3 text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plant.description}
              </p>
            </div>
          )}

          {/* Medicinal Properties */}
          {plant.medicinal_properties && (
            <div className="bg-card rounded-2xl p-6 shadow-card-soft border border-border/50">
              <h2 className="font-semibold text-lg mb-3 text-foreground">Medicinal Properties</h2>
              <p className="text-muted-foreground leading-relaxed">
                {plant.medicinal_properties}
              </p>
            </div>
          )}

          {/* Benefits */}
          {plant.health_benefits && plant.health_benefits.length > 0 && (
            <div className="bg-accent/30 rounded-2xl p-6 border border-border/50">
              <h2 className="font-semibold text-lg mb-3 text-foreground">Health Benefits</h2>
              <ul className="space-y-2">
                {plant.health_benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Uses */}
          {plant.traditional_uses && plant.traditional_uses.length > 0 && (
            <div className="bg-card rounded-2xl p-6 shadow-card-soft border border-border/50">
              <h2 className="font-semibold text-lg mb-3 text-foreground">Traditional Uses</h2>
              <ul className="space-y-2">
                {plant.traditional_uses.map((use, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Precautions */}
          {plant.precautions && (
            <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20">
              <h2 className="font-semibold text-lg mb-2 text-destructive">Precautions</h2>
              <p className="text-sm text-muted-foreground">
                {plant.precautions}
              </p>
            </div>
          )}

          {/* Warning */}
          <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20">
            <h2 className="font-semibold text-lg mb-2 text-destructive">Important Notice</h2>
            <p className="text-sm text-muted-foreground">
              Always consult with a healthcare professional before using any medicinal plant. This information is for educational purposes only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlantDetail;
