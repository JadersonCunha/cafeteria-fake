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
            'café': 'O café é uma das bebidas mais consumidas no mundo! Originário da Etiópia, é feito dos grãos torrados da planta Coffea. Existem dois tipos principais: Arábica (mais suave e aromático) e Robusta (mais forte e com mais cafeína). O sabor varia conforme a origem, torra e método de preparo. Posso te ajudar com receitas específicas!',
            'espresso': 'O espresso é a base de muitas bebidas de café. É preparado forçando água quente sob pressão pelos grãos moídos finamente. Deve ter crema dourada e sabor intenso.',
            'cappuccino': 'O cappuccino é feito com 1/3 espresso, 1/3 leite vaporizado e 1/3 espuma de leite. É tradicionalmente servido em xícara de 150-180ml.',
            'latte': 'O latte tem mais leite que o cappuccino: espresso com muito leite vaporizado e pouca espuma. Perfeito para quem gosta de sabor mais suave.',
            'arabica': 'Café Arábica tem sabor mais suave e doce, com menos cafeína. É considerado de qualidade superior ao Robusta.',
            'robusta': 'Café Robusta tem mais cafeína, sabor mais amargo e é mais resistente. Usado em blends para espresso.',
            'moagem': 'A moagem deve ser adequada ao método: fina para espresso, média para filtro, grossa para French Press.',
            'french press': 'French Press usa moagem grossa e tempo de extração de 4 minutos. Produz café encorpado e aromático.',
            'v60': 'V60 é um método de filtro que realça acidez e notas frutais. Use moagem média-fina e despeje a água em movimentos circulares.',
            'torra': 'A torra influencia o sabor: clara preserva acidez, média equilibra doçura e acidez, escura intensifica amargor.',
            'barista': 'Um bom barista domina temperatura (90-96°C), tempo de extração, proporção café/água e técnicas de vaporização do leite.',
            'como fazer': 'Para um bom café: use água entre 90-96°C, proporção 1:15 (café:água), grãos frescos moídos na hora, e tempo de extração adequado ao método escolhido.',
            'receita': 'Receita básica de café coado: 30g de café para 450ml de água. Água a 92°C, despeje devagar em movimentos circulares, tempo total 4-6 minutos.',
            'origem': 'O café tem origem na Etiópia e se espalhou pelo mundo. Brasil é o maior produtor, seguido por Vietnã e Colômbia. Cada região tem características únicas de sabor.',
            'brasil': 'O café chegou ao Brasil em 1727, trazido pelo sargento-mor Francisco de Melo Palheta do Pará. Inicialmente cultivado no Norte, depois se expandiu para o Sudeste. O Brasil se tornou o maior produtor mundial de café.',
            'história': 'O café foi descoberto na Etiópia, chegou ao Iêmen no século XV, depois Europa no século XVII. No Brasil chegou em 1727 e revolucionou a economia nacional nos séculos XVIII e XIX.',
            'quando': 'O café chegou ao Brasil em 1727, trazido por Francisco de Melo Palheta. A partir daí se espalhou pelo país, especialmente em São Paulo, Minas Gerais e Rio de Janeiro.',
            'chegou': 'O café chegou ao Brasil em 1727 pelas mãos do sargento-mor Francisco de Melo Palheta, que trouxe as primeiras mudas da Guiana Francesa para o Pará.',
            '1727': 'Em 1727, Francisco de Melo Palheta trouxe as primeiras mudas de café para o Brasil, vindas da Guiana Francesa. Este foi o início da cafeicultura brasileira.',
            'palheta': 'Francisco de Melo Palheta foi o responsável por trazer o café ao Brasil em 1727. Ele conseguiu as mudas na Guiana Francesa e as plantou no Pará.',
            'produção': 'O Brasil é o maior produtor mundial de café, responsável por cerca de 30% da produção global. Principais regiões: Minas Gerais, São Paulo, Espírito Santo e Bahia.',
            'regiões': 'Principais regiões cafeeiras do Brasil: Cerrado Mineiro, Sul de Minas, Mogiana, Alta Paulista, Montanhas do Espírito Santo e Planalto da Bahia. Cada uma com características únicas.'
        };

        const queryLower = query.toLowerCase().trim();
        let response = '';
        let found = false;
        
        // Busca por palavras-chave
        for (const [key, value] of Object.entries(coffeeResponses)) {
            if (queryLower.includes(key)) {
                response = value;
                found = true;
                break;
            }
        }
        
        // Se não encontrou resposta específica, dar informação geral sobre café
        if (!found) {
            response = 'Sou especialista em café! Posso te ajudar com: história do café (origem, chegada ao Brasil em 1727), tipos de grãos (arábica/robusta), bebidas (espresso, cappuccino, latte), métodos de preparo (V60, French Press), torra, moagem, receitas, regiões produtoras e dicas de barista. O que você gostaria de saber especificamente?';
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