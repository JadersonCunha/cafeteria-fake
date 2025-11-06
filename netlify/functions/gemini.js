exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

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
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Chave de API não configurada' })
            };
        }

        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Body obrigatório' })
            };
        }

        const { query } = JSON.parse(event.body);
        
        if (!query) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query obrigatória' })
            };
        }

        // Chamar seu agente específico "Tudo Sobre o café"
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/agents/02dcbcbd106c:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: query
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Erro da API Gemini:', response.status, errorData);
            
            // Fallback para resposta genérica se API falhar
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    result: `Sobre ${query}: Sou um especialista em café e posso ajudar com informações sobre diferentes tipos de café, métodos de preparo, e tudo relacionado ao mundo do café!` 
                })
            };
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || `Sobre ${query}: Posso ajudar com informações sobre café!`;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ result: text })
        };

    } catch (error) {
        console.error('Erro geral:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: `Erro interno: ${error.message}` })
        };
    }
};
