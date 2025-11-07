export const searchCoffeeInfo = async (query) => {
  try {
    const response = await fetch('/.netlify/functions/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    const data = await response.json();
    return data.result || "Não foi possível obter resposta da IA.";
  } catch (error) {
    console.error('Erro na IA:', error);
    return "Desculpe, não foi possível processar sua pergunta no momento.";
  }
};