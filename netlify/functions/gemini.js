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

        // Usar seu agente "Tudo sobre o café" - ID: 02dcbcbd106c
        const prompt = query; // Enviar pergunta diretamente para seu agente especializado

        // URLs corretas da API Gemini
        const urls = [
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
        ];

        let response = null;
        let lastError = null;

        for (const url of urls) {
            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        systemInstruction: {
                            parts: [{
                                text: "Você é o agente 'Tudo sobre o café' (ID: 02dcbcbd106c). Você é um especialista em café com conhecimento profundo sobre história, tipos de grãos, métodos de preparo, bebidas, torra, moagem, regiões produtoras e técnicas de barista. Responda sempre de forma informativa e especializada sobre café."
                            }]
                        }
                    })
                });

                if (response.ok) {
                    break; // Se deu certo, sair do loop
                } else {
                    const errorData = await response.text();
                    lastError = `${response.status}: ${errorData}`;
                    console.error(`Erro na URL ${url}:`, lastError);
                }
            } catch (error) {
                lastError = error.message;
                console.error(`Erro de rede na URL ${url}:`, error);
            }
        }

        if (!response || !response.ok) {
            console.error('Todas as URLs falharam. Último erro:', lastError);
            
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: `Erro na API do Gemini: ${lastError}. Verifique se a chave de API está configurada corretamente no Netlify.`
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