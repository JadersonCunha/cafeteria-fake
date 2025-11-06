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

        // Resposta simulada para teste - depois trocaremos pela API real
        const coffeeResponses = {
            'café': 'O café é uma bebida estimulante feita a partir dos grãos torrados da planta Coffea. É uma das bebidas mais populares do mundo!',
            'espresso': 'O espresso é um método de preparo do café onde a água quente é forçada sob pressão pelos grãos moídos finamente.',
            'cappuccino': 'O cappuccino é uma bebida italiana feita com espresso, leite vaporizado e espuma de leite em partes iguais.',
            'latte': 'O latte é uma bebida de café feita com espresso e leite vaporizado, com uma pequena quantidade de espuma por cima.'
        };

        // Buscar resposta baseada na query
        let response = 'Desculpe, não tenho informações específicas sobre isso. Posso ajudar com informações sobre café, espresso, cappuccino ou latte!';
        
        const queryLower = query.toLowerCase();
        for (const [key, value] of Object.entries(coffeeResponses)) {
            if (queryLower.includes(key)) {
                response = value;
                break;
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ result: response })
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
