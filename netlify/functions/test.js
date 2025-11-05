exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Função funcionando!',
                hasApiKey: !!apiKey,
                apiKeyLength: apiKey ? apiKey.length : 0,
                method: event.httpMethod
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};