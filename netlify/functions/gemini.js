const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
    // Headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método não permitido' })
        };
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY; 
        if (!apiKey) {
            console.error('GEMINI_API_KEY não encontrada');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Chave de API do Google não encontrada." }),
            };
        }
        
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Corpo da requisição é obrigatório' })
            };
        }

        const body = JSON.parse(event.body);
        const prompt = body.query;

        if (!prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query é obrigatória' })
            };
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ result: text }),
        };
    } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Erro ao buscar resposta da IA.' }),
        };
    }
};
