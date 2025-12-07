-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create plants table with comprehensive medicinal plant information
CREATE TABLE public.plants (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT,
  common_name TEXT,
  description TEXT,
  medicinal_properties TEXT,
  health_benefits TEXT[],
  traditional_uses TEXT[],
  dosage_instructions TEXT,
  precautions TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read plant data (public information)
CREATE POLICY "Plants are viewable by everyone" 
ON public.plants 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_plants_updated_at
BEFORE UPDATE ON public.plants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the 55 medicinal plants with detailed information
INSERT INTO public.plants (id, name, scientific_name, description, health_benefits, traditional_uses) VALUES
(0, 'Acalypha fruiticosa', 'Acalypha fruticosa', 'A medicinal shrub used in traditional medicine for various ailments.', ARRAY['Anti-inflammatory', 'Antimicrobial', 'Wound healing'], ARRAY['Treating skin conditions', 'Digestive issues']),
(1, 'Aeglo marmelos', 'Aegle marmelos (Bael)', 'Sacred tree with fruit used extensively in Ayurvedic medicine.', ARRAY['Digestive health', 'Diabetes management', 'Immunity boost'], ARRAY['Treating diarrhea', 'Digestive disorders', 'Respiratory conditions']),
(2, 'Alpinia Galanga (Rasna)', 'Alpinia galanga', 'Aromatic rhizome used in traditional medicine and cooking.', ARRAY['Anti-inflammatory', 'Pain relief', 'Digestive aid'], ARRAY['Joint pain treatment', 'Respiratory ailments', 'Digestive issues']),
(3, 'Amaranthus viridis', 'Amaranthus viridis', 'Nutritious leafy vegetable with medicinal properties.', ARRAY['Rich in vitamins', 'Blood purification', 'Anti-anemic'], ARRAY['Nutritional supplement', 'Treating anemia', 'Skin conditions']),
(4, 'Amaranthus Viridis (Arive-Dantu)', 'Amaranthus viridis', 'Local variety known for its nutritional and medicinal value.', ARRAY['Vitamin rich', 'Blood health', 'Immunity'], ARRAY['Nutritional deficiency', 'Blood disorders']),
(5, 'Anisomelus', 'Anisomeles indica', 'Aromatic herb used in traditional medicine.', ARRAY['Antimicrobial', 'Anti-inflammatory', 'Fever reduction'], ARRAY['Treating fever', 'Infections', 'Skin ailments']),
(6, 'Artocarpus Heterophyllus (Jackfruit)', 'Artocarpus heterophyllus', 'Tropical fruit tree with multiple medicinal uses.', ARRAY['Immunity boost', 'Energy source', 'Digestive health'], ARRAY['Nutritional supplement', 'Treating ulcers', 'Skin care']),
(7, 'Azadirachta Indica (Neem)', 'Azadirachta indica', 'Powerful medicinal tree known as natures pharmacy.', ARRAY['Antibacterial', 'Antifungal', 'Blood purification', 'Skin health'], ARRAY['Treating infections', 'Skin diseases', 'Dental care', 'Diabetes management']),
(8, 'Basella Alba (Basale)', 'Basella alba (Malabar Spinach)', 'Nutritious leafy vine with medicinal properties.', ARRAY['Cooling effect', 'Laxative', 'Anti-inflammatory'], ARRAY['Treating constipation', 'Digestive issues', 'Skin conditions']),
(9, 'Brassica Juncea (Indian Mustard)', 'Brassica juncea', 'Mustard plant with seeds used in medicine and cooking.', ARRAY['Digestive stimulant', 'Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating colds', 'Digestive issues', 'Muscle pain']),
(10, 'Carissa Carandas (Karanda)', 'Carissa carandas', 'Berry-bearing shrub used in traditional medicine.', ARRAY['Rich in vitamin C', 'Digestive health', 'Immunity'], ARRAY['Treating digestive issues', 'Anemia', 'Skin care']),
(11, 'Cassia fistula', 'Cassia fistula (Golden Shower)', 'Flowering tree with laxative properties.', ARRAY['Laxative', 'Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating constipation', 'Skin diseases', 'Fever']),
(12, 'Catharanthus roseus', 'Catharanthus roseus (Periwinkle)', 'Ornamental plant with significant medicinal properties.', ARRAY['Diabetes management', 'Blood pressure regulation', 'Cancer research'], ARRAY['Treating diabetes', 'Hypertension', 'Traditional cancer treatments']),
(13, 'Citrus Limon (Lemon)', 'Citrus limon', 'Citrus fruit rich in vitamin C with multiple health benefits.', ARRAY['Vitamin C source', 'Immunity boost', 'Digestive aid', 'Detoxification'], ARRAY['Treating scurvy', 'Digestive issues', 'Skin care', 'Weight management']),
(14, 'Crossandra infundibuliformis', 'Crossandra infundibuliformis (Firecracker Flower)', 'Ornamental plant used in traditional medicine.', ARRAY['Anti-inflammatory', 'Wound healing'], ARRAY['Treating skin conditions', 'Minor wounds']),
(15, 'Emilia sochifolia', 'Emilia sonchifolia', 'Herb used in traditional medicine.', ARRAY['Anti-inflammatory', 'Antimicrobial', 'Wound healing'], ARRAY['Treating wounds', 'Eye infections', 'Diarrhea']),
(16, 'Ervataemea divaricata', 'Ervatamia divaricata (Crepe Jasmine)', 'Ornamental shrub with medicinal uses.', ARRAY['Antimicrobial', 'Anti-inflammatory'], ARRAY['Treating eye infections', 'Skin conditions']),
(17, 'Ficus Auriculata (Roxburgh fig)', 'Ficus auriculata', 'Fig tree with medicinal bark and fruit.', ARRAY['Digestive health', 'Anti-inflammatory', 'Wound healing'], ARRAY['Treating diarrhea', 'Wounds', 'Skin diseases']),
(18, 'Ficus microcarpa', 'Ficus microcarpa (Chinese Banyan)', 'Tree with medicinal bark and latex.', ARRAY['Anti-inflammatory', 'Wound healing'], ARRAY['Treating wounds', 'Skin conditions']),
(19, 'Ficus Religiosa (Peepal Tree)', 'Ficus religiosa', 'Sacred tree with significant medicinal properties.', ARRAY['Anti-inflammatory', 'Antimicrobial', 'Respiratory health'], ARRAY['Treating asthma', 'Skin diseases', 'Digestive issues']),
(20, 'Hibiscus Rosa-sinensis', 'Hibiscus rosa-sinensis (Chinese Hibiscus)', 'Ornamental flower with medicinal uses.', ARRAY['Hair health', 'Blood pressure regulation', 'Anti-inflammatory'], ARRAY['Hair care', 'Treating hypertension', 'Skin care']),
(21, 'Ixora coccinea', 'Ixora coccinea (Jungle Geranium)', 'Ornamental shrub used in traditional medicine.', ARRAY['Anti-inflammatory', 'Antimicrobial', 'Digestive aid'], ARRAY['Treating diarrhea', 'Skin conditions', 'Wounds']),
(22, 'Ixora finalysoiana', 'Ixora finlaysoniana', 'Medicinal shrub used in traditional treatments.', ARRAY['Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating infections', 'Digestive issues']),
(23, 'Jasminum (Jasmine)', 'Jasminum species', 'Fragrant flower used in medicine and aromatherapy.', ARRAY['Stress relief', 'Skin health', 'Antimicrobial'], ARRAY['Aromatherapy', 'Skin care', 'Treating infections']),
(24, 'Lantana camara', 'Lantana camara', 'Flowering plant with medicinal and toxic properties.', ARRAY['Antimicrobial', 'Anti-inflammatory', 'Wound healing'], ARRAY['Treating cuts', 'Skin conditions', 'Fever']),
(25, 'Majidea zangubarica', 'Majidea zanguebarica', 'Tree used in traditional African medicine.', ARRAY['Antimicrobial', 'Anti-inflammatory'], ARRAY['Treating infections', 'Pain relief']),
(26, 'Mangifera Indica (Mango)', 'Mangifera indica', 'Fruit tree with medicinal leaves, bark and fruit.', ARRAY['Immunity boost', 'Digestive health', 'Antioxidant'], ARRAY['Treating diarrhea', 'Diabetes management', 'Skin care']),
(27, 'Mentha (Mint)', 'Mentha species', 'Aromatic herb widely used in medicine and cooking.', ARRAY['Digestive aid', 'Respiratory relief', 'Pain relief', 'Cooling effect'], ARRAY['Treating indigestion', 'Headaches', 'Cold and flu', 'Oral health']),
(28, 'Moringa Oleifera (Drumstick)', 'Moringa oleifera', 'Nutrient-rich tree called miracle tree.', ARRAY['Rich in nutrients', 'Anti-inflammatory', 'Antioxidant', 'Blood sugar regulation'], ARRAY['Nutritional supplement', 'Treating malnutrition', 'Diabetes management', 'Inflammation']),
(29, 'Muntingia calabura', 'Muntingia calabura (Jamaica Cherry)', 'Small fruit tree with medicinal properties.', ARRAY['Antioxidant', 'Anti-inflammatory', 'Pain relief'], ARRAY['Treating headaches', 'Colds', 'Digestive issues']),
(30, 'Muntingia Calabura (Jamaica Cherry-Gasagase)', 'Muntingia calabura', 'Local variety known for its medicinal fruits.', ARRAY['Antioxidant', 'Antimicrobial', 'Anti-inflammatory'], ARRAY['Treating fever', 'Pain', 'Digestive problems']),
(31, 'Murraya Koenigii (Curry)', 'Murraya koenigii (Curry Leaf)', 'Aromatic leaf used in cooking and medicine.', ARRAY['Digestive health', 'Diabetes management', 'Hair health', 'Antioxidant'], ARRAY['Treating diabetes', 'Digestive issues', 'Hair care', 'Eye health']),
(32, 'Nerium Oleander (Oleander)', 'Nerium oleander', 'Ornamental plant with powerful but toxic medicinal properties.', ARRAY['Heart conditions (traditional)', 'Anti-inflammatory'], ARRAY['Traditional heart treatments (highly toxic - use only under expert supervision)']),
(33, 'Nyctanthes Arbor-tristis (Parijata)', 'Nyctanthes arbor-tristis (Night Jasmine)', 'Flowering tree used in Ayurvedic medicine.', ARRAY['Anti-inflammatory', 'Fever reduction', 'Pain relief'], ARRAY['Treating arthritis', 'Fever', 'Sciatica']),
(34, 'Ocimum Tenuiflorum (Tulsi)', 'Ocimum sanctum (Holy Basil)', 'Sacred herb with powerful medicinal properties.', ARRAY['Immunity boost', 'Stress relief', 'Respiratory health', 'Anti-inflammatory'], ARRAY['Treating colds', 'Cough', 'Stress', 'Fever', 'Respiratory infections']),
(35, 'Parthenium hysterophorus', 'Parthenium hysterophorus', 'Invasive weed with limited medicinal use and allergenic properties.', ARRAY['Limited traditional use'], ARRAY['Skin conditions (external)', 'Fever (traditional)']),
(36, 'Pavonia oderata', 'Pavonia odorata', 'Herb used in traditional medicine.', ARRAY['Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating infections', 'Digestive issues']),
(37, 'Pedilanthus sp', 'Pedilanthus species', 'Succulent plant used in traditional medicine.', ARRAY['Anti-inflammatory', 'Wound healing'], ARRAY['Treating skin conditions', 'Minor wounds']),
(38, 'Philodendrom inerme', 'Philodendron species', 'Ornamental plant with limited medicinal use.', ARRAY['Air purification'], ARRAY['Indoor air quality improvement']),
(39, 'Piper Betle (Betel)', 'Piper betel', 'Leaf widely used in traditional medicine and cultural practices.', ARRAY['Digestive aid', 'Antimicrobial', 'Aphrodisiac'], ARRAY['Treating cough', 'Digestive issues', 'Oral health', 'Wounds']),
(40, 'Plectranthus Amboinicus (Mexican Mint)', 'Plectranthus amboinicus (Indian Borage)', 'Aromatic herb with medicinal properties.', ARRAY['Respiratory relief', 'Anti-inflammatory', 'Digestive aid'], ARRAY['Treating cough', 'Cold', 'Digestive problems', 'Skin conditions']),
(41, 'Pongamia pinnata', 'Pongamia pinnata (Indian Beech)', 'Tree with medicinal seeds and oil.', ARRAY['Antimicrobial', 'Anti-inflammatory', 'Skin health'], ARRAY['Treating skin diseases', 'Wounds', 'Rheumatism']),
(42, 'Pongamia Pinnata (Indian Beech)', 'Pongamia pinnata', 'Medicinal tree known for its oil.', ARRAY['Skin conditions', 'Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating eczema', 'Wounds', 'Joint pain']),
(43, 'Psidium Guajava (Guava)', 'Psidium guajava', 'Fruit tree with medicinal leaves and fruit.', ARRAY['Digestive health', 'Immunity boost', 'Antioxidant', 'Blood sugar control'], ARRAY['Treating diarrhea', 'Dental care', 'Diabetes', 'Skin care']),
(44, 'Punica Granatum (Pomegranate)', 'Punica granatum', 'Fruit rich in antioxidants with medicinal properties.', ARRAY['Heart health', 'Antioxidant', 'Anti-inflammatory', 'Cancer prevention'], ARRAY['Treating digestive issues', 'Heart conditions', 'Anemia', 'Skin care']),
(45, 'Santalum Album (Sandalwood)', 'Santalum album', 'Aromatic wood used in medicine and aromatherapy.', ARRAY['Skin health', 'Anti-inflammatory', 'Antimicrobial', 'Calming effect'], ARRAY['Treating skin conditions', 'Aromatherapy', 'Cooling agent', 'Anxiety relief']),
(46, 'Sida cordifolia', 'Sida cordifolia', 'Herb used in Ayurvedic medicine.', ARRAY['Energy boost', 'Respiratory health', 'Anti-inflammatory'], ARRAY['Treating asthma', 'Cough', 'Rheumatism']),
(47, 'Syzygium Cumini (Jamun)', 'Syzygium cumini (Black Plum)', 'Fruit tree used in diabetes management.', ARRAY['Diabetes control', 'Digestive health', 'Antioxidant'], ARRAY['Treating diabetes', 'Diarrhea', 'Digestive issues']),
(48, 'Syzygium Jambos (Rose Apple)', 'Syzygium jambos', 'Fruit tree with medicinal properties.', ARRAY['Digestive health', 'Antioxidant', 'Immunity boost'], ARRAY['Treating digestive issues', 'Fever', 'Skin care']),
(49, 'Tabernaemontana divaricata', 'Tabernaemontana divaricata (Crepe Jasmine)', 'Ornamental shrub with medicinal uses.', ARRAY['Anti-inflammatory', 'Antimicrobial', 'Eye health'], ARRAY['Treating eye infections', 'Skin conditions', 'Wounds']),
(50, 'Tabernaemontana Divaricata (Crape Jasmine)', 'Tabernaemontana divaricata', 'Medicinal shrub used in traditional medicine.', ARRAY['Antimicrobial', 'Anti-inflammatory', 'Analgesic'], ARRAY['Treating infections', 'Pain', 'Eye problems']),
(51, 'Tecoma', 'Tecoma stans (Yellow Bells)', 'Ornamental plant with medicinal properties.', ARRAY['Diabetes management', 'Digestive health'], ARRAY['Treating diabetes', 'Digestive issues']),
(52, 'Terminalia catappa', 'Terminalia catappa (Indian Almond)', 'Tree with medicinal leaves and bark.', ARRAY['Liver health', 'Anti-inflammatory', 'Antioxidant'], ARRAY['Treating liver conditions', 'Skin diseases', 'Digestive issues']),
(53, 'Trigonella Foenum-graecum (Fenugreek)', 'Trigonella foenum-graecum', 'Seed with powerful medicinal properties.', ARRAY['Diabetes control', 'Lactation support', 'Digestive health', 'Anti-inflammatory'], ARRAY['Treating diabetes', 'Increasing milk production', 'Digestive issues', 'Inflammation']),
(54, 'wrightia tinctoria', 'Wrightia tinctoria', 'Tree used in treating skin conditions.', ARRAY['Skin health', 'Anti-inflammatory', 'Antimicrobial'], ARRAY['Treating psoriasis', 'Eczema', 'Skin infections']);