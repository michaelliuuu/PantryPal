import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('pp-frontend'));

// Main page
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'pp-frontend/index.html'));
});

// Recipe page
app.get('/recipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'pp-frontend/recipe.html'));
});

// Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pp-frontend/contact.html'));
});

// Recieve user prompt and sends back bot response
const API_KEY = process.env.API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        };

        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error.message);

        res.json({ response: data.candidates[0].content.parts[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));