import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Info } from "lucide-react";
import { PredictionResult } from "@/utils/tfliteModel";
import { getPlantById } from "@/utils/plantDatabase";
import type { PlantFromDB } from "@/utils/plantDatabase";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, imageData } = location.state as {
    results: PredictionResult[];
    imageData: string;
  };
  const [plants, setPlants] = useState<(PlantFromDB | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!results) {
      navigate("/");
      return;
    }

    const loadPlants = async () => {
      setLoading(true);
      const plantPromises = results.map((result) =>
        getPlantById(result.plantId)
      );
      const loadedPlants = await Promise.all(plantPromises);
      setPlants(loadedPlants);
      setLoading(false);
    };

    loadPlants();
  }, [results, navigate]);

  const topResult = results?.[0];
  const topPlant = plants[0];

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 mb-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Identification Results</h1>
          <p className="text-sm text-muted-foreground">Plant identified successfully</p>
        </div>
      </motion.div>

      {/* Captured Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6"
      >
        <img
          src={imageData}
          alt="Captured plant"
          className="w-full h-48 object-cover rounded-2xl shadow-leaf"
        />
      </motion.div>

      {/* Top Result */}
      {loading ? (
        <div className="text-center text-muted-foreground mb-6">
          Loading plant details...
        </div>
      ) : topResult && topPlant && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6 bg-botanical-gradient text-primary-foreground border-0 shadow-leaf">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{topPlant.name}</h2>
                {topPlant.scientific_name && (
                  <p className="text-sm opacity-80 italic mb-2">
                    {topPlant.scientific_name}
                  </p>
                )}
                <p className="text-sm opacity-90">
                  Confidence: {topResult.confidence.toFixed(1)}%
                </p>
              </div>
            </div>
            {topPlant.description && (
              <p className="text-sm opacity-90 mb-4 line-clamp-2">
                {topPlant.description}
              </p>
            )}
            <Button
              onClick={() => navigate(`/plant/${topResult.plantId}`)}
              variant="secondary"
              className="w-full"
            >
              <Info className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Other Possible Matches */}
      {!loading && results && results.length > 1 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Other Possible Matches
          </h3>
          <div className="space-y-3">
            {results.slice(1).map((result, index) => {
              const plant = plants[index + 1];
              if (!plant) return null;
              return (
                <Card
                  key={result.plantId}
                  className="p-4 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => navigate(`/plant/${result.plantId}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{plant.name}</h4>
                      {plant.scientific_name && (
                        <p className="text-xs text-muted-foreground italic">
                          {plant.scientific_name}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {result.confidence.toFixed(1)}% match
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                      #{index + 2}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 space-y-3"
      >
        <Button
          onClick={() => navigate("/identify")}
          className="w-full h-14 bg-botanical-gradient hover:opacity-90 shadow-leaf"
        >
          Identify Another Plant
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full h-14 border-2"
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default Results;
