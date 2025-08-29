const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

app.post('/gemini-search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Nenhuma pergunta foi enviada.' });
  }

  try {
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    res.json({ result: text });
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    res.status(500).json({ error: 'Erro ao buscar resposta da IA.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});