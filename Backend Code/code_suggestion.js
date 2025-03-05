const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 3001;
const openai = new OpenAI({ apiKey: 'your_openai_api_key' });

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint to suggest code improvements
app.post('/suggest', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Code input is required' });

    try {
        const response = await openai.completions.create({
            model: 'gpt-4',
            prompt: `Suggest improvements for the following JavaScript code:

${code}

Provide only the improved code.`,
            max_tokens: 200,
            temperature: 0.7
        });

        res.json({ suggestion: response.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Error generating code suggestion', details: error.message });
    }
});

// Start Server
app.listen(port, () => console.log(`Code suggestion server running on http://localhost:${port}`));
