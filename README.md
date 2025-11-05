# Cafeteria React

Uma aplicação React profissional para uma cafeteria com integração de IA para busca de informações sobre café.

## Funcionalidades

- Interface responsiva e moderna
- Sistema de carrinho de compras
- Integração com IA (Google Gemini) para busca de informações sobre café
- Modais interativos
- Sistema de pagamento simulado
- Scroll suave e botão "voltar ao topo"

## Tecnologias Utilizadas

- React 18
- CSS3 com variáveis customizadas
- Google Gemini AI
- Netlify Functions
- Hooks customizados

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure a variável de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave da API do Google Gemini:
```
GEMINI_API_KEY=sua_chave_aqui
```

4. Execute o projeto localmente:
```bash
npm start
```

## Deploy no Netlify

1. Faça o build do projeto:
```bash
npm run build
```

2. Configure as variáveis de ambiente no Netlify:
   - Vá para Site Settings > Environment Variables
   - Adicione `GEMINI_API_KEY` com sua chave da API

3. O deploy será automático através do `netlify.toml` configurado

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── hooks/              # Hooks customizados
├── services/           # Serviços (API calls)
├── App.js             # Componente principal
├── index.js           # Ponto de entrada
└── styles.css         # Estilos globais

netlify/
└── functions/         # Funções serverless
    └── gemini.js      # Função para IA

public/
├── Assets/            # Imagens e recursos
└── index.html         # Template HTML
```

## Funcionalidades da IA

O agente IA integrado permite aos usuários fazer perguntas sobre café e receber respostas personalizadas através da API do Google Gemini. A funcionalidade está totalmente integrada e funcionará após o deploy no Netlify.

## Responsividade

O site é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktop (1200px+)
- Tablet (900px - 1199px)
- Mobile (até 899px)