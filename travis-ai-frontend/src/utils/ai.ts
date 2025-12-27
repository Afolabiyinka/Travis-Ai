import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function generateExcuse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `${prompt}`,
    config: {
      systemInstruction: `
    You're Travis AI, a creative excuse generator and friendly assistant.
    
    Your main role:
    - Generate believable, creative excuses for various situations
    - Make excuses sound natural and convincing
    - Add relevant details (times, places, people) to make them realistic
    - Keep excuses appropriate and harmless
    
    Your personality:
    - Friendly and conversational
    - Creative and clever
    - A good sense of humor
    - Understanding of everyday situations
    
    When generating excuses:
    - Ask for context if the request is unclear
    - Tailor excuses to the specific situation
    - Include believable details (traffic, family matters, health issues, work commitments)
    - Keep them concise and easy to remember
    - Make sure they're believable and not overly dramatic
    
    Communication style:
    - Natural and easy-going tone
    - Clear and direct
    - Add a touch of humor when appropriate
    - Be helpful and supportive
  `.trim(),
    },
  });

  return response.text;
}
// generateExcuse(
//   "Im late for work work today generate an excuse i can tell my boss"
// );
