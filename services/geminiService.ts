import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SlokaResponse } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const slokaSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sanskrit: {
      type: Type.STRING,
      description: "The original Sanskrit text of the sloka in Devanagari script.",
    },
    transliteration: {
      type: Type.STRING,
      description: "English transliteration of the Sanskrit text.",
    },
    translation: {
      type: Type.STRING,
      description: "Literal translation of the sloka in the requested language.",
    },
    modernContext: {
      type: Type.STRING,
      description: "A detailed explanation of the verse in the requested language using a modern-day scenario (e.g., corporate life, student stress, relationships) that makes it relatable.",
    },
    practicalApplication: {
      type: Type.STRING,
      description: "A specific, actionable piece of advice in the requested language derived from this verse for daily life.",
    },
    keyTakeaway: {
      type: Type.STRING,
      description: "A short, punchy summary phrase or motto from this verse in the requested language.",
    },
  },
  required: ["sanskrit", "transliteration", "translation", "modernContext", "practicalApplication", "keyTakeaway"],
};

export const fetchSlokaExplanation = async (chapter: number, verse: number, language: string): Promise<SlokaResponse> => {
  try {
    const prompt = `
      Explain Bhagavad Gita Chapter ${chapter}, Verse ${verse}.
      
      Target Language: ${language}.
      
      Output Instructions:
      1. **Sanskrit**: Provide original text in Devanagari.
      2. **Transliteration**: Provide in English characters (ISO 15919 or standard common usage).
      3. **Translation**: Literal meaning in ${language}.
      4. **Modern Interpretation**: Explain the concept in ${language} using modern contexts (work, stress, lifestyle).
      5. **Practical Application**: Actionable advice in ${language}.
      6. **Key Takeaway**: A short summary motto in ${language}.

      Make the tone wise, empathetic, and accessible, acting like a modern mentor.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: slokaSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated");
    }

    return JSON.parse(text) as SlokaResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};