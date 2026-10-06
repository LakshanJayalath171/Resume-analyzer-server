import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
  model: "gemini-3.8-flash",
});

export const analyzeResume = async (text) => {
  const prompt = `
    You are an expert ATS resume analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Analyze:

1. Personal information
2. Professional summary
3. Skills
4. Work experience
5. Education
6. Projects
7. Certifications
8. Resume strengths
9. Resume issues
10. Missing keywords
11. ATS score from 0-100

Resume:
${text}`;

  const response = await ai.models.generateContent({
    prompt: prompt,
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text;
};
