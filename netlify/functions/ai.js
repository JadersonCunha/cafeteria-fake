exports.handler = async (event, context) => {
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
      body: JSON.stringify({ error: 'Only POST allowed' })
    };
  }

  try {
    const { query } = JSON.parse(event.body || '{}');
    
    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query required' })
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key missing' })
      };
    }

    // Usar sua URL correta do Gemini 2.0 Flash
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Você é um especialista em café. Responda sobre: ${query}`
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: `API Error: ${response.status}` })
      };
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível obter resposta.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};