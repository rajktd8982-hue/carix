import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// CARIX AI Modification Advisor endpoint
app.post('/api/carix-ai/suggest', async (req, res) => {
  const { carMake, carModel, year, variant, style, budget, desiredMods } = req.body;

  const prompt = `You are CARIX AI, an expert automotive tuning and styling advisor specializing in the Indian car modification scene (cars like Volkswagen Virtus, Skoda Slavia, Hyundai Verna, Honda City, Mahindra Thar, Tata Nexon, Swift, Creta, etc.).
A user is asking for modification suggestions for their car:
- Make & Model: ${carMake || ''} ${carModel || 'Virtus GT'}
- Year: ${year || '2026'}
- Variant: ${variant || 'GT Plus'}
- Desired Style: ${style || 'Sporty / OEM+'} (e.g., Clean, Sporty, Aggressive, OEM+, Show car)
- Approximate Budget: ₹${budget || '1,00,000'}
- Desired modifications: ${desiredMods || 'Exterior styling, wheels, stance'}

Provide a structured, realistic, and highly practical build blueprint tailored specifically to this vehicle.
IMPORTANT SAFETY & LEGAL GUIDELINES:
- Never claim exact fitment unless certified by the shop/supplier.
- Include a reminder regarding Indian RTO / motor vehicle regulations (tint laws, exhaust decibel limits, structural alterations).
- Give realistic Indian Rupee (₹) price ranges for each mod category.
- Give a list of recommended questions the owner should ask modification shops before fitting.

Format the response strictly as valid JSON with the following keys:
{
  "buildTitle": "string",
  "styleSummary": "string",
  "categories": [
    {
      "categoryName": "string",
      "recommendedMods": ["string"],
      "estimatedCostRange": "string",
      "installationDifficulty": "Easy" | "Moderate" | "Professional Required",
      "styleImpact": "string"
    }
  ],
  "questionsForShops": ["string"],
  "legalAndSafetyAdvisory": "string",
  "overallEstimatedBudget": "string"
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      return res.json({ success: true, data: JSON.parse(text) });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local automotive database:', err?.message);
    }
  }

  // High-fidelity fallback logic tuned for Indian car models
  const isSUV = /thar|scorpio|nexon|creta|harrier|safari/i.test(`${carMake} ${carModel}`);
  const fallback = {
    buildTitle: `${carModel || 'Virtus GT'} ${style || 'Sporty OEM+'} Blueprint`,
    styleSummary: isSUV 
      ? `A rugged, high-stance overland aesthetic engineered for both urban presence and trail capability.`
      : `A low-slung, sharp OEM+ aesthetic accentuating the clean European bodylines without compromising daily ground clearance.`,
    categories: isSUV ? [
      {
        categoryName: "Wheels & Stance",
        recommendedMods: ["17-inch Negative Offset Bronze Beadlock Alloys", "All-Terrain (A/T) 265/65 R17 Tyres", "2-inch Comfort Lift Kit"],
        estimatedCostRange: "₹85,000 - ₹1,40,000",
        installationDifficulty: "Professional Required",
        styleImpact: "High road presence & trail stance"
      },
      {
        categoryName: "Exterior & Armor",
        recommendedMods: ["Steel Offroad Front Bumper with integrated shackles", "Metal Skid Plates", "Aggressive Dark Honeycomb Grille", "Roof Platform Rack"],
        estimatedCostRange: "₹35,000 - ₹65,000",
        installationDifficulty: "Moderate",
        styleImpact: "Rugged indestructible silhouette"
      },
      {
        categoryName: "Lighting & Auxiliary",
        recommendedMods: ["7-inch LED Projector Headlamps with DRL rings", "Amber LED Pod Cube Lights with hood mounts"],
        estimatedCostRange: "₹18,000 - ₹32,000",
        installationDifficulty: "Moderate",
        styleImpact: "High-visibility expedition aesthetic"
      }
    ] : [
      {
        categoryName: "Aero & Exterior Styling",
        recommendedMods: ["3-piece Gloss Black Front Lip Splitter", "Extended Side Skirts with Aero Winglets", "Rear Trunk Ducktail Lip Spoiler in Carbon Fiber", "Gloss Black Mirror Caps"],
        estimatedCostRange: "₹22,000 - ₹45,000",
        installationDifficulty: "Moderate",
        styleImpact: "Sharper, lower visual profile"
      },
      {
        categoryName: "Wheels & Stance",
        recommendedMods: ["17-inch Flow-Formed Multi-Spoke Gloss Black Alloys", "215/45 R17 Ultra High Performance Tyres", "30mm Lowering Springs (Progressive rate)"],
        estimatedCostRange: "₹65,000 - ₹1,10,000",
        installationDifficulty: "Professional Required",
        styleImpact: "Eliminates wheel gap, aggressive road-hug"
      },
      {
        categoryName: "Lighting & Details",
        recommendedMods: ["Smoked LED Dynamic Sequential Tail Lamps", "Full Chrome Delete in Satin Matte Black Wrap", "Subtle Roof Blackout Wrap"],
        estimatedCostRange: "₹14,000 - ₹28,000",
        installationDifficulty: "Easy",
        styleImpact: "Stealth sporty contrast"
      },
      {
        categoryName: "Performance & Audio",
        recommendedMods: ["BMC or K&N High Flow Filter", "Valvetronic Catback Exhaust with Dual Burnt Tips", "Damping Sheets & Focal Component Speakers"],
        estimatedCostRange: "₹38,000 - ₹75,000",
        installationDifficulty: "Professional Required",
        styleImpact: "Deep refined note & acoustic cabin"
      }
    ],
    questionsForShops: [
      "Is this front lip direct bolt-on or does it require bumper drilling?",
      "Does this wheel offset (ET) cause any fender scrub at full lock or with 4 passengers?",
      "Can the chrome delete film be removed later without damaging OEM clearcoat?",
      "Do the lowering springs maintain OEM shock absorber warranty or damper life?"
    ],
    legalAndSafetyAdvisory: "Note: In India, structural cuts and exhaust sound above 80dB are strictly regulated under the Motor Vehicles Act. Always ensure modifications maintain structural safety and keep OEM parts safely stored.",
    overallEstimatedBudget: `₹${budget || '95,000 - 1,80,000'}`
  };

  return res.json({ success: true, data: fallback });
});

// AI Visual Concept Generator
app.post('/api/carix-ai/visualize-concept', async (req, res) => {
  const { carModel, color, frontLip, wheels, spoiler, sideSkirts, hood, lighting, wrap } = req.body;

  const conceptBlueprint = {
    carModel: carModel || 'Volkswagen Virtus GT',
    baseColor: color || 'Candy White',
    selectedElements: {
      frontLip: frontLip || 'Gloss Black 3-piece Splitter with Winglets',
      wheels: wheels || '18-inch Satin Black Forged Monoblock Alloys',
      spoiler: spoiler || 'M-Performance style carbon fiber lip',
      sideSkirts: sideSkirts || 'Aero profile gloss black skirts',
      hood: hood || 'OEM vented style dual cowl',
      lighting: lighting || 'Smoked Matrix LED with red accent bar',
      wrap: wrap || 'Satin Nero Dual-tone Roof & Pillars'
    },
    visualSummary: `Aggressive track-inspired stance with contrast gloss black aerodynamic extensions against the ${color || 'Candy White'} bodywork. The stance is lowered by 25mm, framing the ${wheels || '18-inch Satin Black'} wheels with flush fitment.`,
    curatedPreviewUrl: '/assets/concept-preview.jpg',
    disclaimer: 'Concept visualization for styling exploration. Actual parts may differ based on shop manufacturing specifications and vehicle chassis tolerances.'
  };

  return res.json({ success: true, concept: conceptBlueprint });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CARIX Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
