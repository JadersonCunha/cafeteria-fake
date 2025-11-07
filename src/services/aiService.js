export const searchCoffeeInfo = async (query) => {
  try {
    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro do servidor:', response.status, errorText);
      console.error('URL chamada:', '/.netlify/functions/gemini');
      console.error('Query enviada:', query);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.result || "Não foi possível obter resposta da IA.";
  } catch (error) {
    console.error('Falha ao se comunicar com o agente IA:', error);
    throw new Error(error.message || "Erro ao buscar resposta da IA.");
  }
};