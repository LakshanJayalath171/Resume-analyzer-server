import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeOpenAiResume = async (text) => {
  const response = await openai.responses.create({
    model: "gpt-5.5",

    instructions: `
You are an expert ATS resume analyzer.

Analyze the provided resume carefully.

Evaluate:
- ATS score
- resume strengths
- resume weaknesses
- missing keywords
- skills
- experience
- education
- projects
- certifications
- actionable improvements
- improved bullet points

Only use information that can reasonably be determined from the resume.
Do not invent experience, skills, companies, degrees, or certifications.
`,

    input: `
Analyze this resume:

${text}
`,

    text: {
      format: {
        type: "json_schema",
        name: "resume_analysis",
        strict: true,

        schema: {
          type: "object",

          properties: {
            ats_score: {
              type: "number",
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            weaknesses: {
              type: "array",
              items: {
                type: "string",
              },
            },

            missing_keywords: {
              type: "array",
              items: {
                type: "string",
              },
            },

            skills: {
              type: "array",
              items: {
                type: "string",
              },
            },

            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                  duration: {
                    type: "string",
                  },
                },
                required: ["company", "role", "duration"],
                additionalProperties: false,
              },
            },

            education: {
              type: "array",
              items: {
                type: "string",
              },
            },

            projects: {
              type: "array",
              items: {
                type: "string",
              },
            },

            certifications: {
              type: "array",
              items: {
                type: "string",
              },
            },

            improvements: {
              type: "array",
              items: {
                type: "string",
              },
            },

            bullet_rewrites: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  original: {
                    type: "string",
                  },
                  improved: {
                    type: "string",
                  },
                },
                required: ["original", "improved"],
                additionalProperties: false,
              },
            },
          },

          required: [
            "ats_score",
            "strengths",
            "weaknesses",
            "missing_keywords",
            "skills",
            "experience",
            "education",
            "projects",
            "certifications",
            "improvements",
            "bullet_rewrites",
          ],

          additionalProperties: false,
        },
      },
    },
  });

  return JSON.parse(response.output_text);
};
