import { supabase } from "@/integrations/supabase/client";

export interface PlantFromDB {
  id: number;
  name: string;
  scientific_name: string | null;
  common_name: string | null;
  description: string | null;
  medicinal_properties: string | null;
  health_benefits: string[] | null;
  traditional_uses: string[] | null;
  dosage_instructions: string | null;
  precautions: string | null;
  image_url: string | null;
}

export const getPlantById = async (id: number): Promise<PlantFromDB | null> => {
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching plant:", error);
    return null;
  }

  return data;
};

export const getAllPlants = async (): Promise<PlantFromDB[]> => {
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching plants:", error);
    return [];
  }

  return data || [];
};

export const searchPlants = async (query: string): Promise<PlantFromDB[]> => {
  if (!query.trim()) {
    return getAllPlants();
  }

  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .or(`name.ilike.%${query}%,scientific_name.ilike.%${query}%`)
    .order("name");

  if (error) {
    console.error("Error searching plants:", error);
    return [];
  }

  return data || [];
};
