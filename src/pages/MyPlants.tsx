import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Leaf, ChevronRight } from "lucide-react";
import { getAllPlants, searchPlants } from "@/utils/plantDatabase";
import type { PlantFromDB } from "@/utils/plantDatabase";
import { useNavigate } from "react-router-dom";

const MyPlants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [plants, setPlants] = useState<PlantFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    setLoading(true);
    const data = await getAllPlants();
    setPlants(data);
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const delayDebounce = setTimeout(async () => {
        const results = await searchPlants(searchQuery);
        setPlants(results);
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      loadPlants();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border p-6 pb-4"
      >
        <h1 className="text-2xl font-bold mb-4">My Plants</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medicinal plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-full border-2"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          {loading ? "Loading..." : `${plants.length} ${plants.length === 1 ? 'plant' : 'plants'} found`}
        </p>
      </motion.div>

      {/* Plants List */}
      <div className="p-6 space-y-3">
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading plants...</p>
        ) : plants.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No plants found</p>
        ) : (
          plants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => navigate(`/plant/${plant.id}`)}
              className="bg-card rounded-2xl p-4 shadow-card-soft hover:shadow-leaf transition-all cursor-pointer border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-botanical-gradient flex items-center justify-center flex-shrink-0 shadow-leaf">
                  <Leaf className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {plant.scientific_name || "Medicinal plant"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPlants;
