export interface Plant {
  id: number;
  name: string;
  scientificName?: string;
  commonName?: string;
  benefits?: string[];
  uses?: string[];
  description?: string;
}

export const plantNames = [
  "Acalypha fruiticosa",
  "Aeglo marmelos",
  "Alpinia Galanga (Rasna)",
  "Amaranthus viridis",
  "Amaranthus Viridis (Arive-Dantu)",
  "Anisomelus",
  "Artocarpus Heterophyllus (Jackfruit)",
  "Azadirachta Indica (Neem)",
  "Basella Alba (Basale)",
  "Brassica Juncea (Indian Mustard)",
  "Carissa Carandas (Karanda)",
  "Cassia fistula",
  "Catharanthus roseus",
  "Citrus Limon (Lemon)",
  "Crossandra infundibuliformis",
  "Emilia sochifolia",
  "Ervataemea divaricata",
  "Ficus Auriculata (Roxburgh fig)",
  "Ficus microcarpa",
  "Ficus Religiosa (Peepal Tree)",
  "Hibiscus Rosa-sinensis",
  "Ixora coccinea",
  "Ixora finalysoiana",
  "Jasminum (Jasmine)",
  "Lantana camara",
  "Majidea zangubarica",
  "Mangifera Indica (Mango)",
  "Mentha (Mint)",
  "Moringa Oleifera (Drumstick)",
  "Muntingia calabura",
  "Muntingia Calabura (Jamaica Cherry-Gasagase)",
  "Murraya Koenigii (Curry)",
  "Nerium Oleander (Oleander)",
  "Nyctanthes Arbor-tristis (Parijata)",
  "Ocimum Tenuiflorum (Tulsi)",
  "Parthenium hysterophorus",
  "Pavonia oderata",
  "Pedilanthus sp",
  "Philodendrom inerme",
  "Piper Betle (Betel)",
  "Plectranthus Amboinicus (Mexican Mint)",
  "Pongamia pinnata",
  "Pongamia Pinnata (Indian Beech)",
  "Psidium Guajava (Guava)",
  "Punica Granatum (Pomegranate)",
  "Santalum Album (Sandalwood)",
  "Sida cordifolia",
  "Syzygium Cumini (Jamun)",
  "Syzygium Jambos (Rose Apple)",
  "Tabernaemontana divaricata",
  "Tabernaemontana Divaricata (Crape Jasmine)",
  "Tecoma",
  "Terminalia catappa",
  "Trigonella Foenum-graecum (Fenugreek)",
  "wrightia tinctoria",
];

export const plants: Plant[] = plantNames.map((name, index) => ({
  id: index,
  name: name,
  description: `${name} is a medicinal plant with various therapeutic properties.`,
  benefits: ["Traditional medicine", "Natural remedy", "Health benefits"],
  uses: ["Herbal treatment", "Medicinal purposes"],
}));

export const getPlantById = (id: number): Plant | undefined => {
  return plants.find((plant) => plant.id === id);
};

export const searchPlants = (query: string): Plant[] => {
  if (!query) return plants;
  const lowerQuery = query.toLowerCase();
  return plants.filter((plant) =>
    plant.name.toLowerCase().includes(lowerQuery)
  );
};
