const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateSummary = async (req, res) => {
  try {
    const { title } = req.body;

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a concise blog post summary (maximum 50 words) for a post with the title: "${title}". The summary should be engaging and informative.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error("AI Summary Generation Error:", error);
    res.status(500).json({ msg: "Failed to generate summary" });
  }
};

const generateContent = async (req, res) => {
  try {
    const { title, summary } = req.body;
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Write a professional blog post based on:
    Title: "${title}"
    Summary: "${summary}"

    Guidelines:
    - Write in a clear, engaging style
    - Use simple paragraphs without special characters or markdown
    - Include an introduction, 2-3 main sections, and a conclusion
    - Keep the formatting simple and clean
    - Use only basic HTML tags like <p>, <h2>, and <br> for structure
    - Write naturally as if for a professional blog
    - Avoid using special characters like #, *, or other markdown symbols
    - Each section should be 2-3 paragraphs long

    Please write the blog post now:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();

    // Clean up the content
    content = content
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove italic markdown
      .replace(/```[^`]*```/g, '') // Remove code blocks
      .replace(/\n\n+/g, '\n\n') // Normalize line breaks
      .trim();

    // Add basic HTML structure
    content = `<p>${content.replace(/\n\n/g, '</p><p>')}</p>`;

    res.json({ content });
  } catch (error) {
    console.error('AI Content Generation Error:', error);
    res.status(500).json({ msg: "Failed to generate content" });
  }
};

module.exports = { generateSummary, generateContent };
