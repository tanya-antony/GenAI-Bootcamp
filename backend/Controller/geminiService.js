const axios = require('axios');
require('dotenv').config();

const MODEL_NAME = process.env.MODEL_NAME; 
console.log("Using model:", MODEL_NAME);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Correct endpoint from your curl
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const generateResponse = async (prompt) => {
    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        // Access generated text
        console.log("Gemini response:", JSON.stringify(response.data, null, 2));

        // Safe access
        const candidates = response.data?.candidates;
        if (!candidates || candidates.length === 0) {
            throw new Error("No candidates returned by Gemini");
        }

        const contentParts = candidates[0]?.content;
        if (!contentParts || contentParts.length === 0) {
            throw new Error("No content in Gemini response");
        }

        const text = candidates[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("Text not found in Gemini response");
        }

        // --- STRUCTURING LOGIC ---
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const structured = { summary: '', sections: [] };
        let currentSection = null;

        for (let line of lines) {
            line = line.trim();

            // Section title: either ends with ":" or is in bold
            const boldTitleMatch = line.match(/^\*\*(.+?)\*\*:?$/);
            const colonTitleMatch = line.match(/^(.+?):$/);

            if (boldTitleMatch) {
                if (currentSection) structured.sections.push(currentSection);
                currentSection = { title: boldTitleMatch[1].trim(), content: [] };
            } else if (colonTitleMatch) {
                if (currentSection) structured.sections.push(currentSection);
                currentSection = { title: colonTitleMatch[1].trim(), content: [] };
            }
            // Bullet points: "*", "-", or numbered list
            else if (/^(\*|-|\d+\.)\s+/.test(line)) {
                if (!currentSection) currentSection = { title: "Miscellaneous", content: [] };
                const contentLine = line.replace(/^(\*|-|\d+\.)\s+/, '').trim();
                currentSection.content.push(contentLine);
            }
            // Treat as summary if no section yet
            else if (!currentSection && !structured.summary) {
                structured.summary = line;
            }
        }

        // Push last section if exists
        if (currentSection) structured.sections.push(currentSection);

        return structured;

    } catch (error) {
        console.error("Gemini API error:", error.response?.data || error.message);
        throw new Error("Failed to generate response from Gemini");
    }
};

module.exports = { getGeminiResponse: generateResponse };
