# Flight Deck API Dashboard

## Apresentacao rapida

Demo online: https://uso-de-api.onrender.com/

Dashboard full-stack desenvolvido para demonstrar integracao com API real, tratamento de dados no backend e entrega de uma interface moderna e responsiva no frontend.

### Destaques para recrutador

- API externa real (SpaceX v4) consumida no backend
- Node.js + TypeScript no servidor com agregacao e cache
- Frontend em JavaScript puro com visualizacao de metricas e historico
- Arquitetura simples, clara e pronta para evolucao

### O que este projeto evidencia

- Capacidade de transformar dados de API em visao executiva
- Separacao de responsabilidades entre backend e frontend
- Qualidade de entrega para portfolio tecnico (documentacao + deploy)

Projeto de dashboard full-stack desenvolvido para demonstrar consumo de API externa, organizacao de dados no backend e experiencia visual no frontend.

## Visao geral

- Backend em Node.js com TypeScript e Express
- Frontend em JavaScript, HTML e CSS servidos pelo proprio servidor
- Consumo da API publica da SpaceX para exibir indicadores de operacao, proximos lancamentos e historico de missoes
- Interface responsiva, pronta para apresentacao em repositorio e avaliacao tecnica

## Stack

- Node.js
- TypeScript
- JavaScript
- Express
- API publica: https://api.spacexdata.com/v4

## Funcionalidades

- Cards com metricas principais da SpaceX
- Destaque para o proximo lancamento com contagem de tempo restante
- Grafico de lancamentos por ano
- Ranking de uso por foguete
- Lista dos ultimos lancamentos com status de sucesso ou falha
- Cache simples no backend para reduzir chamadas repetidas a API externa

## Como executar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Aplicacao disponivel em `http://localhost:3000`.

### 3. Gerar build de producao

```bash
npm run build
```

### 4. Iniciar build compilada

```bash
npm start
```

## Deploy no Render

O projeto esta pronto para deploy no Render como Web Service.

### Opcao 1. Deploy rapido pelo painel

1. Acesse o painel do Render e clique em New +.
2. Escolha Web Service.
3. Conecte o repositorio `Finno600/Uso-de-Api`.
4. Configure os campos principais:

```text
Name: uso-de-api
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
```

5. Clique em Create Web Service.

### Opcao 2. Deploy com Blueprint

O repositorio tambem possui um arquivo `render.yaml`.

1. No Render, clique em New +.
2. Escolha Blueprint.
3. Selecione o mesmo repositorio.
4. O Render vai ler a configuracao automaticamente.

### URL para portfolio

Depois do deploy, adicione a URL publica no topo deste README para facilitar a avaliacao do recrutador. Exemplo:

```text
Demo online: https://uso-de-api.onrender.com
```

## Estrutura

```text
.
|-- public/
|   |-- app.js
|   |-- index.html
|   \-- styles.css
|-- src/
|   \-- server.ts
|-- .gitignore
|-- package.json
|-- README.md
\-- tsconfig.json
```

## Decisoes tecnicas

- O backend centraliza a comunicacao com a API externa e entrega ao frontend um payload pronto para renderizacao.
- O frontend foi mantido em JavaScript puro para mostrar dominio da base web sem depender de framework.
- O layout busca um visual mais forte e apresentavel para portfolio, sem abrir mao da leitura e da responsividade.

## Observacao para recrutadores

Este repositorio foi pensado para evidenciar:

- integracao com API real
- organizacao de projeto full-stack
- separacao entre camadas de dados e interface
- cuidado com apresentacao visual e documentacao