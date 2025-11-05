# Instruções de Deploy no Netlify

## Pré-requisitos
1. Conta no Netlify (https://netlify.com)
2. Chave da API do Google Gemini

## Passos para Deploy

### 1. Preparação do Projeto
```bash
npm run build
```

### 2. Deploy Manual (Primeira vez)
1. Acesse https://app.netlify.com
2. Clique em "Add new site" > "Deploy manually"
3. Arraste a pasta `build` para a área de upload
4. Aguarde o deploy ser concluído

### 3. Configuração das Variáveis de Ambiente
1. No painel do Netlify, vá para "Site settings"
2. Clique em "Environment variables"
3. Adicione a variável:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API do Google Gemini

### 4. Deploy Automático via Git (Recomendado)
1. Conecte seu repositório GitHub ao Netlify
2. Configure as seguintes opções:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Functions directory**: `netlify/functions`

### 5. Configuração da Função Netlify
A função `gemini.js` já está configurada em `netlify/functions/`. 
Ela será automaticamente detectada pelo Netlify.

### 6. Teste da IA
Após o deploy:
1. Acesse seu site
2. Use a barra de pesquisa no header
3. Digite uma pergunta sobre café
4. Verifique se a IA responde corretamente

## Estrutura de Arquivos Importantes
```
├── build/                 # Pasta gerada pelo build (para deploy)
├── netlify/
│   └── functions/
│       └── gemini.js     # Função serverless da IA
├── netlify.toml          # Configuração do Netlify
├── .env                  # Variáveis locais (não fazer commit)
└── package.json          # Dependências e scripts
```

## Solução de Problemas

### IA não funciona
- Verifique se a variável `GEMINI_API_KEY` está configurada
- Confirme se a chave da API está válida
- Verifique os logs da função no painel do Netlify

### Imagens não carregam
- Confirme se a pasta `Assets` está em `public/Assets`
- Verifique se os caminhos das imagens estão corretos

### Build falha
- Execute `npm install` localmente
- Teste `npm run build` localmente primeiro
- Verifique se todas as dependências estão no package.json

## URLs Importantes
- **Site**: Será fornecido pelo Netlify após deploy
- **Função IA**: `https://seu-site.netlify.app/.netlify/functions/gemini`
- **Painel Admin**: https://app.netlify.com