const axios = require('axios');
require('dotenv').config();

const MODEL_NAME = process.env.MODEL_NAME; 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const generateResponse = async (prompt) => {
    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        // Safe extraction
        // const candidates = response.data?.candidates;
        // const text = candidates?.[0]?.content?.[0]?.text || "";

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

        

        if (!text) {
            console.warn("Gemini returned empty text. Returning default response.");
            return {
                summary: "No response generated.",
                sections: []
            };
        }

        // --- STRUCTURING LOGIC ---
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const structured = { summary: '', sections: [] };
        let currentSection = null;

        for (let line of lines) {
            line = line.trim();
            const boldTitleMatch = line.match(/^\*\*(.+?)\*\*:?$/);
            const colonTitleMatch = line.match(/^(.+?):$/);

            if (boldTitleMatch) {
                if (currentSection) structured.sections.push(currentSection);
                currentSection = { title: boldTitleMatch[1].trim(), content: [] };
            } else if (colonTitleMatch) {
                if (currentSection) structured.sections.push(currentSection);
                currentSection = { title: colonTitleMatch[1].trim(), content: [] };
            } else if (/^(\*|-|\d+\.)\s+/.test(line)) {
                if (!currentSection) currentSection = { title: "Miscellaneous", content: [] };
                const contentLine = line.replace(/^(\*|-|\d+\.)\s+/, '').trim();
                currentSection.content.push(contentLine);
            } else if (!currentSection && !structured.summary) {
                structured.summary = line;
            }
        }

        if (currentSection) structured.sections.push(currentSection);

        return structured;

    } catch (error) {
        console.error("Gemini API error:", error.response?.data || error.message);
        // Return default structured response instead of throwing
        return {
            summary: "Sorry, I couldn't generate a response at the moment.",
            sections: []
        };
    }
};

module.exports = { getGeminiResponse: generateResponse };
