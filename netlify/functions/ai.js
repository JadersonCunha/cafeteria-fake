exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Only POST allowed' })
    };
  }

  try {
    // Parse body
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON' })
      };
    }

    const { query } = body;
    
    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query required' })
      };
    }

    // Get API key
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key missing' })
      };
    }

    // Simple coffee responses for now
    const coffeeAnswers = {
      'quando': 'O café chegou ao Brasil em 1727, trazido por Francisco de Melo Palheta.',
      'brasil': 'O café chegou ao Brasil em 1727 e se tornou a base da economia nacional.',
      'história': 'O café tem origem na Etiópia e chegou ao Brasil em 1727.',
      'espresso': 'Espresso é preparado com água quente sob pressão através de café moído fino.',
      'cappuccino': 'Cappuccino é feito com espresso, leite vaporizado e espuma de leite.',
      'arabica': 'Café Arábica tem sabor mais suave e é considerado de qualidade superior.',
      'robusta': 'Café Robusta tem mais cafeína e sabor mais forte que o Arábica.'
    };

    const queryLower = query.toLowerCase();
    let answer = 'Sou especialista em café! Posso ajudar com informações sobre história, tipos de grãos, métodos de preparo e bebidas de café.';
    
    for (const [key, value] of Object.entries(coffeeAnswers)) {
      if (queryLower.includes(key)) {
        answer = value;
        break;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result: answer })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Server error: ${error.message}` })
    };
  }
};