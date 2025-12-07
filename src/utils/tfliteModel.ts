import { supabase } from "@/integrations/supabase/client";

export interface PredictionResult {
  plantId: number;
  plantName: string;
  confidence: number;
}

export const identifyPlant = async (imageData: string): Promise<PredictionResult[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('identify-plant', {
      body: { imageData }
    });

    if (error) {
      console.error('Error calling identify-plant function:', error);
      throw new Error(error.message || 'Failed to identify plant');
    }

    if (!data || !data.results) {
      throw new Error('Invalid response from identification service');
    }

    return data.results;
  } catch (error) {
    console.error('Error identifying plant:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to identify plant');
  }
};
