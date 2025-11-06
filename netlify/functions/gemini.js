exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Função IA funcionando!',
                status: 'OK',
                usage: 'Use POST com {"query": "sua pergunta"}'
            })
        };
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

        // Conectar com API real do Gemini
        const prompt = `Você é um especialista em café com conhecimento profundo sobre:
- História do café (origem, chegada ao Brasil em 1727 por Francisco de Melo Palheta)
- Tipos de grãos (Arábica, Robusta, suas características)
- Métodos de preparo (Espresso, V60, French Press, Chemex, etc.)
- Bebidas (Cappuccino, Latte, Macchiato, etc.)
- Torra e moagem
- Regiões produtoras
- Técnicas de barista
- Equipamentos

Responda de forma informativa, prática e amigável. Se a pergunta não for sobre café, redirecione educadamente para temas relacionados ao café.

Pergunta: ${query}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Erro da API Gemini:', response.status, errorData);
            
            // Fallback se API falhar
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    result: `Sobre "${query}": Sou um especialista em café! Infelizmente estou com problemas técnicos no momento, mas posso te ajudar com informações sobre história do café, tipos de grãos, métodos de preparo e muito mais. Tente novamente em alguns instantes!` 
                })
            };
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || `Sobre "${query}": Posso ajudar com informações sobre café!`;

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