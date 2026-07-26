// src/services/gemini.service.js

const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getRecommendations(userPreference, products) {
  const prompt = `
User Preference:
${JSON.stringify(userPreference)}

Available Messes:
${JSON.stringify(products)}

Recommend the BEST 5 messes.

Return ONLY valid JSON in this format:

[
  {
    "id": "...",
    "reason": "...",
    "score": 95
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });
  // const recommendations = JSON.parse(response.text);

  const cleaned = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const recommendations = JSON.parse(cleaned);

const recommendedMesses = recommendations
  .map((item) => {
    const mess = products.find(
      (m) => m._id.toString() === item.id
    );

    if (!mess) return null;

    return {
      ...mess,
      aiReason: item.reason,
      aiScore: item.score,
    };
  })
  .filter(Boolean);

// return recommendedMesses;
  

  return recommendedMesses;
}

module.exports = { getRecommendations };
