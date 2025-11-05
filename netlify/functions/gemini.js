const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY; 
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Chave de API do Google não encontrada." }),
            };
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const body = JSON.parse(event.body);
        const prompt = body.query;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ result: text }),
        };
    } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao buscar resposta da IA.' }),
        };
    }
};
