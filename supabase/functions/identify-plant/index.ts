import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLANT_LIST = [
  "Acalypha fruiticosa", "Aeglo marmelos", "Alpinia Galanga (Rasna)", "Amaranthus viridis",
  "Amaranthus Viridis (Arive-Dantu)", "Anisomelus", "Artocarpus Heterophyllus (Jackfruit)",
  "Azadirachta Indica (Neem)", "Basella Alba (Basale)", "Brassica Juncea (Indian Mustard)",
  "Carissa Carandas (Karanda)", "Cassia fistula", "Catharanthus roseus", "Citrus Limon (Lemon)",
  "Crossandra infundibuliformis", "Emilia sochifolia", "Ervataemea divaricata",
  "Ficus Auriculata (Roxburgh fig)", "Ficus microcarpa", "Ficus Religiosa (Peepal Tree)",
  "Hibiscus Rosa-sinensis", "Ixora coccinea", "Ixora finalysoiana", "Jasminum (Jasmine)",
  "Lantana camara", "Majidea zangubarica", "Mangifera Indica (Mango)", "Mentha (Mint)",
  "Moringa Oleifera (Drumstick)", "Muntingia calabura", "Muntingia Calabura (Jamaica Cherry-Gasagase)",
  "Murraya Koenigii (Curry)", "Nerium Oleander (Oleander)", "Nyctanthes Arbor-tristis (Parijata)",
  "Ocimum Tenuiflorum (Tulsi)", "Parthenium hysterophorus", "Pavonia oderata", "Pedilanthus sp",
  "Philodendrom inerme", "Piper Betle (Betel)", "Plectranthus Amboinicus (Mexican Mint)",
  "Pongamia pinnata", "Pongamia Pinnata (Indian Beech)", "Psidium Guajava (Guava)",
  "Punica Granatum (Pomegranate)", "Santalum Album (Sandalwood)", "Sida cordifolia",
  "Syzygium Cumini (Jamun)", "Syzygium Jambos (Rose Apple)", "Tabernaemontana divaricata",
  "Tabernaemontana Divaricata (Crape Jasmine)", "Tecoma", "Terminalia catappa",
  "Trigonella Foenum-graecum (Fenugreek)", "wrightia tinctoria"
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error("No image data provided");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Call Lovable AI with vision capabilities
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert botanist specializing in medicinal plants. Analyze the provided plant image and identify it from this list of 55 medicinal plants: ${PLANT_LIST.join(", ")}. 
            
Return your response as a JSON array of up to 5 matches, ordered by confidence (highest first). Each match should have:
- plantId: the index (0-54) of the plant in the list
- plantName: the exact name from the list
- confidence: a number between 0-100 representing your confidence

Example format:
[
  {"plantId": 7, "plantName": "Azadirachta Indica (Neem)", "confidence": 95},
  {"plantId": 34, "plantName": "Ocimum Tenuiflorum (Tulsi)", "confidence": 75}
]

Only return valid JSON, no additional text.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Identify this medicinal plant from the list provided."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI identification failed");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the AI response - strip markdown code blocks if present
    let results;
    try {
      let cleanContent = content.trim();
      
      // Remove markdown code blocks if present
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
      }
      
      results = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
