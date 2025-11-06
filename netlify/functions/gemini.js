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

        
        const coffeeResponses = {
            'espresso': 'O espresso é a base de muitas bebidas de café. É preparado forçando água quente sob pressão pelos grãos moídos finamente. Deve ter crema dourada e sabor intenso.',
            'cappuccino': 'O cappuccino é feito com 1/3 espresso, 1/3 leite vaporizado e 1/3 espuma de leite. É tradicionalmente servido em xícara de 150-180ml.',
            'latte': 'O latte tem mais leite que o cappuccino: espresso com muito leite vaporizado e pouca espuma. Perfeito para quem gosta de sabor mais suave.',
            'arabica': 'Café Arábica tem sabor mais suave e doce, com menos cafeína. É considerado de qualidade superior ao Robusta.',
            'robusta': 'Café Robusta tem mais cafeína, sabor mais amargo e é mais resistente. Usado em blends para espresso.',
            'moagem': 'A moagem deve ser adequada ao método: fina para espresso, média para filtro, grossa para French Press.',
            'french press': 'French Press usa moagem grossa e tempo de extração de 4 minutos. Produz café encorpado e aromático.',
            'v60': 'V60 é um método de filtro que realça acidez e notas frutais. Use moagem média-fina e despeje a água em movimentos circulares.',
            'torra': 'A torra influencia o sabor: clara preserva acidez, média equilibra doçura e acidez, escura intensifica amargor.',
            'barista': 'Um bom barista domina temperatura (90-96°C), tempo de extração, proporção café/água e técnicas de vaporização do leite.'
        };

        let response = `Sobre "${query}": `;
        
        const queryLower = query.toLowerCase();
        let found = false;
        
        for (const [key, value] of Object.entries(coffeeResponses)) {
            if (queryLower.includes(key)) {
                response = value;
                found = true;
                break;
            }
        }
        
        if (!found) {
            response += 'Sou especialista em café! Posso ajudar com informações sobre espresso, cappuccino, latte, tipos de grãos (arabica/robusta), moagem, métodos de preparo (V60, French Press), torra, dicas de barista e muito mais sobre café!';
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